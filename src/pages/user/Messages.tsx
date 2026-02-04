import React, { useState } from 'react';
import { Send, Search, Inbox } from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const messages = [
    { id: '1', from: 'Support Team', subject: 'Welcome!', date: '2024-01-15', preview: 'Welcome to the portal...', isRead: false },
    { id: '2', from: 'Your Representative', subject: 'Application Update', date: '2024-01-14', preview: 'Your application has been...', isRead: true },
  ];

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 card">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
                placeholder="Search messages..."
              />
            </div>
          </div>

          <div className="space-y-2">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedMessage(message.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedMessage === message.id
                    ? 'bg-primary-100 border-2 border-primary-300'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-semibold text-gray-900">{message.from}</p>
                  {!message.isRead && <span className="h-2 w-2 bg-primary-600 rounded-full"></span>}
                </div>
                <p className="text-sm text-gray-700 mb-1">{message.subject}</p>
                <p className="text-xs text-gray-500">{message.date}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 card">
          {selectedMessage ? (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {messages.find((m) => m.id === selectedMessage)?.subject}
              </h2>
              <p className="text-gray-600 mb-6">Message content will be displayed here...</p>
              <button className="btn btn-primary">
                <Send className="h-5 w-5 mr-2" />
                Reply
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Inbox className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
