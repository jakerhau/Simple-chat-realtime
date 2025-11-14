'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { sendMessage } from '../graphql/operations';
// Ensure Amplify is configured before creating client
import '../lib/amplify-config';

const client = generateClient();
const CURRENT_USER_KEY = 'currentUser';

export default function SendMessage() {
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load saved user name from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      setSender(savedUser);
    }
  }, []);

  // Save user name to localStorage when it changes
  const handleSenderChange = (value: string) => {
    setSender(value);
    if (value.trim()) {
      localStorage.setItem(CURRENT_USER_KEY, value.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !sender.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await client.graphql({
        query: sendMessage,
        variables: {
          content: content.trim(),
          sender: sender.trim(),
        },
      });

      setContent('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 items-center">
        <div className="flex-1">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-900 placeholder:text-gray-500 leading-normal"
            placeholder="Type your message..."
            rows={2}
            disabled={loading}
          />
        </div>
        <div className="w-32">
          <input
            id="sender"
            type="text"
            value={sender}
            onChange={(e) => handleSenderChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500 h-[60px]"
            placeholder="Your name"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap h-[60px]"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {error && (
        <div className="text-red-600 text-sm mt-2">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm mt-2">Message sent successfully!</div>
      )}
    </div>
  );
}

