import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import videoRoutes from './routes/videoRoutes';
import { logger } from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/youtube_automation';

// Middleware
app.use(express.json());

// Routes
app.use('/api/video', videoRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('YouTube Automation Backend is running!');
});

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    logger.error('MongoDB connection error:', err);
    process.exit(1);
  });