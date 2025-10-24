import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { ConsumptionRecord } from '../entities/ConsumptionRecord';
import { User } from '../entities/User';
import { HealthMetric } from '../entities/HealthMetric';

const router = Router();
const consumptionRepository = AppDataSource.getRepository(ConsumptionRecord);
const userRepository = AppDataSource.getRepository(User);
const healthRepository = AppDataSource.getRepository(HealthMetric);

// Get national consumption statistics
router.get('/national/consumption', async (req: Request, res: Response) => {
  const { days = 30 } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days as string));

  const records = await consumptionRepository.find({
    where: {
      recordedAt: { $gte: startDate } as any,
    },
  });

  const totalOil = records.reduce((sum, r) => sum + parseFloat(r.oilQuantityGrams.toString()), 0);
  const avgDaily = totalOil / parseInt(days as string);
  const userCount = new Set(records.map(r => r.userId)).size;

  res.json({
    success: true,
    data: {
      period: `${days} days`,
      totalOilConsumed: totalOil,
      averageDailyConsumption: avgDaily,
      activeUsers: userCount,
      recordCount: records.length,
    },
  });
});

// Get state-wise consumption
router.get('/state/:state/consumption', async (req: Request, res: Response) => {
  const { state } = req.params;
  const { days = 30 } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days as string));

  const users = await userRepository.find({ where: { state } });
  const userIds = users.map(u => u.id);

  const records = await consumptionRepository.find({
    where: {
      userId: { $in: userIds } as any,
      recordedAt: { $gte: startDate } as any,
    },
  });

  const totalOil = records.reduce((sum, r) => sum + parseFloat(r.oilQuantityGrams.toString()), 0);

  res.json({
    success: true,
    data: {
      state,
      period: `${days} days`,
      totalOilConsumed: totalOil,
      activeUsers: users.length,
      recordCount: records.length,
    },
  });
});

// Get health risk distribution
router.get('/health/risk-distribution', async (req: Request, res: Response) => {
  const metrics = await healthRepository.find();

  const distribution = {
    low: metrics.filter(m => m.riskLevel === 'low').length,
    moderate: metrics.filter(m => m.riskLevel === 'moderate').length,
    high: metrics.filter(m => m.riskLevel === 'high').length,
    critical: metrics.filter(m => m.riskLevel === 'critical').length,
  };

  res.json({
    success: true,
    data: {
      totalUsers: metrics.length,
      distribution,
      percentages: {
        low: ((distribution.low / metrics.length) * 100).toFixed(2),
        moderate: ((distribution.moderate / metrics.length) * 100).toFixed(2),
        high: ((distribution.high / metrics.length) * 100).toFixed(2),
        critical: ((distribution.critical / metrics.length) * 100).toFixed(2),
      },
    },
  });
});

// Get campaign impact
router.get('/campaign/impact', async (req: Request, res: Response) => {
  const users = await userRepository.find();
  const metrics = await healthRepository.find();

  const avgRiskScore = metrics.length > 0
    ? metrics.reduce((sum, m) => sum + m.healthRiskScore, 0) / metrics.length
    : 0;

  res.json({
    success: true,
    data: {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      averageHealthRiskScore: avgRiskScore.toFixed(2),
      usersByType: {
        household: users.filter(u => u.userType === 'household').length,
        school: users.filter(u => u.userType === 'school').length,
        hospital: users.filter(u => u.userType === 'hospital').length,
        restaurant: users.filter(u => u.userType === 'restaurant').length,
      },
    },
  });
});

export default router;

