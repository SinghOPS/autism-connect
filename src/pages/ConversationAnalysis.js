import React, { useState } from 'react';
import ConversationAnalyzer from '../components/ConversationAnalyzer';
import FeedbackDisplay from '../components/FeedbackDisplay';

function ConversationAnalysis() {
  const [feedback, setFeedback] = useState('');

  const handleAnalysisResult = (result) => {
    // Generate feedback based on analysis result
    let newFeedback = '';
    switch (result.sentiment) {
      case 'Positive':
        newFeedback = "Great job! Your tone is positive and engaging.";
        break;
      case 'Negative':
        newFeedback = "Your tone might be perceived as negative. Try to use more positive language.";
        break;
      case 'Neutral':
        newFeedback = "Your tone is neutral. Consider adding some enthusiasm to engage your conversation partner more.";
        break;
      default:
        newFeedback = "Keep practicing your conversation skills!";
    }
    setFeedback(newFeedback);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Conversation Analysis</h1>
      <ConversationAnalyzer onAnalysisResult={handleAnalysisResult} />
      <FeedbackDisplay feedback={feedback} />
    </div>
  );
}

export default ConversationAnalysis;