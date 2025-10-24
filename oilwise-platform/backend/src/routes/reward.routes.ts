import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { RewardPoint } from '../entities/RewardPoint';
import { User } from '../entities/User';
import { ValidationError } from '../middleware/error-handler';

const router = Router();
const rewardRepository = AppDataSource.getRepository(RewardPoint);
const userRepository = AppDataSource.getRepository(User);

// Award points for consumption reduction
router.post(
  '/award',
  [
    body('userId').notEmpty(),
    body('points').isInt({ min: 1 }),
    body('rewardType').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const { userId, points, rewardType, description, metadata } = req.body;

    const reward = rewardRepository.create({
      userId,
      points,
      rewardType,
      description,
      metadata,
    });

    await rewardRepository.save(reward);

    // Update user total points
    const user = await userRepository.findOne({ where: { id: userId } });
    if (user) {
      user.totalRewardPoints += points;
      await userRepository.save(user);
    }

    res.status(201).json({
      success: true,
      message: 'Reward points awarded',
      data: reward,
    });
  }
);

// Get user rewards
router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { redeemed = false } = req.query;

  let query = rewardRepository.createQueryBuilder('reward')
    .where('reward.userId = :userId', { userId });

  if (redeemed === 'false') {
    query = query.andWhere('reward.isRedeemed = :isRedeemed', { isRedeemed: false });
  }

  const rewards = await query.orderBy('reward.createdAt', 'DESC').getMany();

  const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);

  res.json({
    success: true,
    data: {
      rewards,
      totalPoints,
    },
  });
});

// Redeem rewards
router.post(
  '/redeem/:rewardId',
  async (req: Request, res: Response) => {
    const { rewardId } = req.params;

    const reward = await rewardRepository.findOne({ where: { id: rewardId } });

    if (!reward) {
      throw new ValidationError('Reward not found');
    }

    if (reward.isRedeemed) {
      throw new ValidationError('Reward already redeemed');
    }

    reward.isRedeemed = true;
    reward.redeemedAt = new Date();

    await rewardRepository.save(reward);

    res.json({
      success: true,
      message: 'Reward redeemed successfully',
      data: reward,
    });
  }
);

// Get leaderboard
router.get('/leaderboard/top', async (req: Request, res: Response) => {
  const { limit = 10 } = req.query;

  const topUsers = await userRepository
    .createQueryBuilder('user')
    .orderBy('user.totalRewardPoints', 'DESC')
    .limit(parseInt(limit as string))
    .getMany();

  res.json({
    success: true,
    data: topUsers.map(u => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      points: u.totalRewardPoints,
      state: u.state,
    })),
  });
});

export default router;

