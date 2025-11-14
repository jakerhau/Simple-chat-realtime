'use client';

// Import amplify-config to ensure Amplify is configured before components use it
import '../lib/amplify-config';
import MessageList from '../components/MessageList';
import SendMessage from '../components/SendMessage';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
      <main className="container mx-auto px-4 py-6 max-w-4xl h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Chat Room</h1>
            <p className="text-sm text-gray-500">Send and receive messages in real-time</p>
          </div>
        </div>

        {/* Messages Section - Takes up available space */}
        <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <MessageList />
        </div>
        
        {/* Send Message Form - Fixed at bottom */}
        <div className="flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200">
          <SendMessage />
        </div>
      </main>
    </div>
  );
}
