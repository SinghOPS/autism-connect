const express = require('express');
const router = express.Router();
const facialAnalysisController = require('../controllers/facialAnalysisController');

router.post('/analyze', facialAnalysisController.analyzeFacialExpression);

module.exports = router;