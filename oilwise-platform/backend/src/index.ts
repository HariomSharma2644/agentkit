import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'express-async-errors';
import { AppDataSource } from './database/data-source';
import { errorHandler } from './middleware/error-handler';
import { logger } from './utils/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import consumptionRoutes from './routes/consumption.routes';
import healthRoutes from './routes/health.routes';
import recipeRoutes from './routes/recipe.routes';
import rewardRoutes from './routes/reward.routes';
import analyticsRoutes from './routes/analytics.routes';
import partnerRoutes from './routes/partner.routes';
import blockchainRoutes from './routes/blockchain.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/consumption', consumptionRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/blockchain', blockchainRoutes);

// Error handling
app.use(errorHandler);

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    await AppDataSource.initialize();
    logger.info('Database connected successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`OilWise Backend running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;

