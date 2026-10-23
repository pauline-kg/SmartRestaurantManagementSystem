import React, { useState } from 'react';
import { AI_KNOWLEDGE_BASE } from '../../data/mockData';
import './AIChat.css';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (questionText) => {
    const query = questionText || input;
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);

    // Local simulation lookup matching the dataset table
    const match = AI_KNOWLEDGE_BASE.find(
      (kb) => kb.question.toLowerCase() === query.toLowerCase()
    );

    const botResponse = match
      ? match.answer
      : "I'm sorry, I don't have information on that. Try asking about our daily specials or vegetarian options!";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: botResponse }]);
    }, 400);

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🤖 AI Assistant</div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="sample-queries">
        <p>Quick questions you can ask:</p>
        <div className="query-buttons">
          {AI_KNOWLEDGE_BASE.map((kb, idx) => (
            <button key={idx} onClick={() => handleSend(kb.question)}>
              {kb.question}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-input-area">
        <input 
          type="text" 
          placeholder="Ask something..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
}