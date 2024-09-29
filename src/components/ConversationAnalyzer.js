import React, { useState } from 'react';
import axios from 'axios';

function ConversationAnalyzer() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [isListening, setIsListening] = useState(false);

  const analyzeSentiment = async () => {
    if (text) {
      try {
        const response = await axios.post('/api/conversation-analysis/analyze', { text });
        setSentiment(response.data.sentiment);
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
        setSentiment('Error occurred');
      }
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
      };
      recognition.start();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg shadow-sm"
        rows="4"
        placeholder="Enter or speak your conversation here..."
      />
      <div className="flex space-x-2 mb-4">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-lg ${isListening ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
        <button
          onClick={analyzeSentiment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Analyze Sentiment
        </button>
      </div>
      {sentiment && (
        <p className="mt-4 text-xl font-semibold">
          Sentiment: {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
        </p>
      )}
    </div>
  );
}

export default ConversationAnalyzer;