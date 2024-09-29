const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const userRoutes = require('./routes/userRoutes');
const facialAnalysisRoutes = require('./routes/facialAnalysisRoutes');
const conversationAnalysisRoutes = require('./routes/conversationAnalysisRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Auth0 middleware
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Routes
app.use('/api/user', checkJwt, userRoutes);
app.use('/api/facial-analysis', checkJwt, facialAnalysisRoutes);
app.use('/api/conversation-analysis', checkJwt, conversationAnalysisRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});