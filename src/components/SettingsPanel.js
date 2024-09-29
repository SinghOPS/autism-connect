import React, { useState } from 'react';

function SettingsPanel({ onSave }) {
  const [feedbackType, setFeedbackType] = useState('visual');
  const [colorScheme, setColorScheme] = useState('default');

  const handleSave = () => {
    onSave({ feedbackType, colorScheme });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Feedback Type</label>
        <select
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="visual">Visual</option>
          <option value="auditory">Auditory</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Color Scheme</label>
        <select
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="default">Default</option>
          <option value="highContrast">High Contrast</option>
          <option value="pastel">Pastel</option>
        </select>
      </div>
      <button
        onClick={handleSave}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
}

export default SettingsPanel;