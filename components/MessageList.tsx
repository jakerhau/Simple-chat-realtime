'use client';

import { useEffect, useState, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listMessages, onSendMessage } from '../graphql/operations';
import type { Message } from '../types/graphql';
// Ensure Amplify is configured before creating client
import '../lib/amplify-config';

const client = generateClient();
const CURRENT_USER_KEY = 'currentUser';

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>('');

  // Get current user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    // Listen for storage changes (when user updates their name)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (updatedUser) {
        setCurrentUser(updatedUser);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for same-tab updates
    const interval = setInterval(() => {
      const updatedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (updatedUser) {
        setCurrentUser((prev) => {
          if (prev !== updatedUser) {
            return updatedUser;
          }
          return prev;
        });
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: listMessages,
      });
      const result = await response;
      if ('data' in result && result.data?.listMessages) {
        // Sort messages by createdAt to ensure correct order
        const sortedMessages = [...result.data.listMessages].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateA - dateB; // Oldest first
        });
        setMessages(sortedMessages);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch initial messages
    fetchMessages();

    // Subscribe to new messages
    const subscription = (client.graphql({
      query: onSendMessage,
    }) as any).subscribe({
      next: ({ data }: { data: { onSendMessage?: Message } }) => {
        if (data?.onSendMessage) {
          setMessages((prev) => [...prev, data.onSendMessage!]);
        }
      },
      error: (err: Error) => {
        console.error('Subscription error:', err);
        setError('Failed to subscribe to messages');
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMessages]);

  // Helper function to format time safely
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error, dateString);
      return '';
    }
  };

  return (
    <div className="space-y-2">
      {loading && messages.length === 0 && (
        <p className="text-gray-500 text-center py-8">Loading messages...</p>
      )}
      {error && (
        <div className="p-4 text-red-600 bg-red-50 rounded mb-2">
          {error}
          <button
            onClick={fetchMessages}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}
      {messages.length === 0 && !loading ? (
        <p className="text-gray-500 text-center py-8">No messages yet</p>
      ) : (
        messages.map((message) => {
          const isMyMessage = currentUser && message.sender.toLowerCase().trim() === currentUser.toLowerCase().trim();
          
          return (
            <div
              key={message.id}
              className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-3`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  isMyMessage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {!isMyMessage && (
                  <div className="font-semibold text-sm mb-1 text-gray-700">
                    {message.sender}
                  </div>
                )}
                <p className={isMyMessage ? 'text-white' : 'text-gray-800'}>
                  {message.content}
                </p>
                <div className={`text-xs mt-1 ${isMyMessage ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.createdAt)}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

