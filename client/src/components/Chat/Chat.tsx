import { useState } from 'react';
import './Chat.css';

const Chat = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('http://localhost:5173/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
      setQuestion('');
    } catch {
      setAnswer('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="chat-float-button" onClick={() => setShowChat(!showChat)}>
        💬
      </button>

      {showChat && (
        <div className="chat-popup">
          <h2 className="chat-title">🧠 System Assistant</h2>
          <textarea
            className="chat-textarea"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about the system..."
            disabled={loading}
            autoFocus
          />
          <button
            className="chat-button"
            onClick={handleAsk}
            disabled={!question.trim() || loading}
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>

          {answer && (
            <div className="chat-answer">
              <span className="chat-answer-label">Answer:</span><br />
              {answer}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chat;
