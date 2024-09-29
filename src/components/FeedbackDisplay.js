import React from 'react';

function FeedbackDisplay({ feedback }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-2">Feedback</h2>
      <p className="text-gray-700">{feedback}</p>
    </div>
  );
}

export default FeedbackDisplay;