import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

const ChatWindow = ({ userId, loanId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('join', { userId, loanId });
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off('message');
    };
  }, [userId, loanId]);

  const sendMessage = () => {
    socket.emit('sendMessage', { userId, loanId, content: input });
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.userId === userId ? 'sent' : 'received'}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} className="bg-green-500 text-white px-2 py-1">
        Send
      </button>
    </div>
  );
};

export default ChatWindow;