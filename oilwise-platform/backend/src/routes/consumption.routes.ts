import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { ConsumptionRecord } from '../entities/ConsumptionRecord';
import { ValidationError } from '../middleware/error-handler';

const router = Router();
const consumptionRepository = AppDataSource.getRepository(ConsumptionRecord);

// Record oil consumption
router.post(
  '/record',
  [
    body('userId').notEmpty(),
    body('oilQuantityGrams').isFloat({ min: 0 }),
    body('oilType').notEmpty(),
    body('mealType').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const {
      userId,
      oilQuantityGrams,
      oilType,
      mealType,
      dishName,
      cuisineType,
      ingredients,
      source,
    } = req.body;

    const record = consumptionRepository.create({
      userId,
      oilQuantityGrams,
      oilType,
      mealType,
      dishName,
      cuisineType,
      ingredients,
      source: source || 'manual',
    });

    await consumptionRepository.save(record);

    res.status(201).json({
      success: true,
      message: 'Consumption recorded successfully',
      data: record,
    });
  }
);

// Get consumption history
router.get('/history/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { days = 30 } = req.query;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - parseInt(days as string));

  const records = await consumptionRepository.find({
    where: {
      userId,
      recordedAt: { $gte: startDate } as any,
    },
    order: { recordedAt: 'DESC' },
  });

  const totalOil = records.reduce((sum, r) => sum + parseFloat(r.oilQuantityGrams.toString()), 0);
  const averageDaily = totalOil / parseInt(days as string);

  res.json({
    success: true,
    data: {
      records,
      summary: {
        totalOil,
        averageDaily,
        recordCount: records.length,
      },
    },
  });
});

// Get daily consumption
router.get('/daily/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const records = await consumptionRepository.find({
    where: {
      userId,
      recordedAt: { $gte: today } as any,
    },
  });

  const totalOil = records.reduce((sum, r) => sum + parseFloat(r.oilQuantityGrams.toString()), 0);

  res.json({
    success: true,
    data: {
      date: today,
      totalOil,
      records,
    },
  });
});

export default router;

