import React, { useState } from 'react';

const SpeedDialButton = () => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const response = await fetch('http://18.232.151.88:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setResponseMessage(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Ask Your Assistant</h2>
      <textarea
        rows="4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
        style={{ width: '100%', padding: '10px' }}
      />
      <button
        onClick={handleSend}
        style={{ marginTop: '10px', padding: '10px 20px' }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      <div style={{ marginTop: '20px' }}>
        <strong>Response:</strong>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
};

export default SpeedDialButton;
