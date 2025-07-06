"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import MarkdownPreview from '@uiw/react-markdown-preview';
import '../globals.css';


const ChatComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatWindow = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const userMessage = { content: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://wou6ea4cz5.execute-api.us-east-1.amazonaws.com/dev/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message }),
});

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const responseText = await response.text();
      const apiMessage = { content: responseText, sender: 'api' };
      setMessages(prev => [...prev, apiMessage]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { content: `⚠️ ${error.message}`, sender: 'api', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {isOpen && (
        <div className="w-90 h-90 bg-grey shadow-lg rounded-lg flex flex-col" style={{ height: '30rem', width: '23rem' }}>
          {/* Header */}
          <div className="p-3 bg-gradient-to-r from-blue-900 to-black rounded-t-lg flex justify-between" style={{ height: '60px' }}>
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 text-[40px]">
              Jenas&apos; Assistant
            </h2>
            <button onClick={toggleChatWindow} className="text-white hover:text-gray-200">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400">
            {messages.length === 0 ? (
              <div className="text-center text-black my-4">Send a message to start chatting</div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`my-2 max-w-[80%] p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' ? 'ml-auto bg-blue-200 text-blue-900' : 'mr-auto bg-white border border-gray-200 text-black'
                } ${msg.isError ? 'bg-red-100 text-red-900 border-red-200' : ''}`}>
                <MarkdownPreview
                  source={msg.content}
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 14,
                    color: msg.sender === 'user' ? '#1e3a8a' : '#000000',  // force text color
                    padding: 0,
                  }}
                />
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 my-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce delay-400"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 flex">
            <textarea
              className="flex-1 border rounded-md p-2 mr-2 resize-none overflow-auto text-black"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              rows={1}
              style={{ maxHeight: '40px' }}
            />
            <button
              onClick={sendMessage}
              className={`${
                isLoading ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-600'
              } text-white rounded-full p-2`}
              disabled={isLoading || message.trim() === ''}
            >
              <PaperAirplaneIcon className="h-7 w-7 transform" />
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleChatWindow}
          className="bg-blue-800 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
          <ChatBubbleLeftIcon className="h-9 w-9" />
        </button>
      )}
    </div>
  );
};

export default ChatComponent;
