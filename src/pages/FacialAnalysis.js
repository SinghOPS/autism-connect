import React, { useState } from 'react';
import FacialExpressionDetector from '../components/FacialExpressionDetector';
import FeedbackDisplay from '../components/FeedbackDisplay';

function FacialAnalysis() {
  const [feedback, setFeedback] = useState('');

  const handleExpressionDetected = (expression) => {
    // Generate feedback based on detected expression
    let newFeedback = '';
    switch (expression) {
      case 'happy':
        newFeedback = "Great job! Your smile is warm and welcoming.";
        break;
      case 'sad':
        newFeedback = "You seem a bit down. Try to relax your facial muscles.";
        break;
      case 'angry':
        newFeedback = "You might be coming across as upset. Take a deep breath and try to soften your expression.";
        break;
      case 'neutral':
        newFeedback = "Your expression is neutral. Consider adding a slight smile to appear more approachable.";
        break;
      default:
        newFeedback = "Keep practicing your facial expressions!";
    }
    setFeedback(newFeedback);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Facial Expression Analysis</h1>
      <FacialExpressionDetector onExpressionDetected={handleExpressionDetected} />
      <FeedbackDisplay feedback={feedback} />
    </div>
  );
}

export default FacialAnalysis;