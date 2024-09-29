const axios = require('axios');

exports.analyzeConversation = async (req, res) => {
  try {
    const { text } = req.body;
    
    // Use the Text-Processing API for sentiment analysis
    const response = await axios.post('http://text-processing.com/api/sentiment/', 
      `text=${encodeURIComponent(text)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { label, probability } = response.data;

    let feedback = '';
    if (label === 'pos') {
      feedback = 'Your tone seems positive. Great job!';
    } else if (label === 'neg') {
      feedback = 'Your tone might be perceived as negative. Consider rephrasing.';
    } else {
      feedback = 'Your tone seems neutral.';
    }

    res.json({
      sentiment: label,
      confidence: probability[label],
      feedback
    });
  } catch (error) {
    console.error('Error analyzing conversation:', error);
    res.status(500).json({ message: 'Error analyzing conversation', error: error.message });
  }
};