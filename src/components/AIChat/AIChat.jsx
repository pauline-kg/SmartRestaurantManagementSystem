import React, { useState } from 'react';
import { AI_KNOWLEDGE_BASE } from '../../data/mockData';
import './AIChat.css';

// TODO: fix chat bubble scrolling if messages get too long
function AIChat() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (questionText) => {
    // figure out if it came from the input box or a quick-prompt button
    const query = questionText || input;
    if (!query.trim()) return;

    console.log("User asked:", query); // debug log to check queries

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);

    // search through the knowledge base array
    const match = AI_KNOWLEDGE_BASE.find(
      (kb) => kb.question.toLowerCase() === query.toLowerCase()
    );

    let botResponse = "";
    if (match) {
      botResponse = match.answer;
    } else {
      botResponse = "I'm sorry, I don't have information on that. Try asking about our daily specials or vegetarian options!";
    }

    // fake a short loading delay so it feels like a real chat bot
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

      {/* suggestion buttons mapped from mock data */}
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

export default AIChat;
