const express = require('express');
const router = express.Router();
const conversationAnalysisController = require('../controllers/conversationAnalysisController');

router.post('/analyze', conversationAnalysisController.analyzeConversation);

module.exports = router;