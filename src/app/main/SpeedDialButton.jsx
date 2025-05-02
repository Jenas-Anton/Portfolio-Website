"use client"
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

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChatWindow = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (message.trim() === '') return;
    
    const userMessage = { content: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await fetch('https://fastapichat-production-9fa8.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // Making sure we send { message: "text" }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = { response: responseText };
      }

      const botResponse = data.answer || data.response || data.message || responseText;
      const apiMessage = { content: botResponse, sender: 'api' };
      setMessages(prevMessages => [...prevMessages, apiMessage]);
    } catch (error) {
      const errorMessage = { 
        content: `Error: ${error.message}. Please try again later.`, 
        sender: 'api',
        isError: true
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      {isOpen && (
        <div className="w-86 h-96 bg-grey shadow-lg rounded-lg flex flex-col" style={{ height: '24rem', width: '22rem', maxHeight: '24rem', maxWidth: '22rem' }}>
          <div className="p-3 bg-gradient-to-r from-blue-900 to-black rounded-t-lg flex justify-between" style={{ height: '70px', minHeight: '70px' }}>
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 text-[40px]">
              Jenas&apos; Assistant
            </h2>
            <button 
              onClick={toggleChatWindow} 
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              ✕
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400" style={{ height: 'calc(100% - 130px)', maxHeight: 'calc(100% - 130px)' }}>
            {messages.length === 0 ? (
              <div className="text-center text-black my-4">
                Send a message to start chatting
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`my-2 max-w-[80%] p-3 rounded-lg shadow-sm ${
                    msg.sender === 'user' 
                      ? 'ml-auto bg-blue-200 text-blue-900' 
                      : 'mr-auto bg-white border border-gray-200 text-black'
                  } ${msg.isError ? 'bg-red-100 text-red-900 border-red-200' : ''}`}
                >
                  <MarkdownPreview
                    source={msg.content}
                    style={{
                    backgroundColor: 'transparent',
                    fontSize: 14,
                    color: '#111827',
                    padding: 0,
                          }}
                  />

                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 my-2 max-w-[80%] p-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-3 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-400 rounded-b-lg flex" style={{ height: '60px', minHeight: '60px' }}>
            <textarea
              className="flex-1 border rounded-md p-2 mr-2 resize-none overflow-auto shine-effect text-black"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              rows={1}
              style={{ maxHeight: '36px', height: '36px' }}
            />
            <button
              onClick={sendMessage}
              className={`${
                isLoading ? 'bg-gray-400' : 'bg-blue-800 hover:bg-blue-600'
              } text-white rounded-full p-2 focus:outline-none transition-colors`}
              disabled={isLoading || message.trim() === ''}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5 transform" />
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleChatWindow}
          className="bg-blue-800 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none transition-colors"
          aria-label="Open chat"
        >
          <ChatBubbleLeftIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatComponent;