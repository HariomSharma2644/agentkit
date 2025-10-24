import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';
import { ValidationError, NotFoundError } from '../middleware/error-handler';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Get user profile
router.get('/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      state: user.state,
      district: user.district,
      preferences: user.preferences,
      totalRewardPoints: user.totalRewardPoints,
    },
  });
});

// Update user profile
router.put(
  '/:userId',
  [
    body('firstName').optional().notEmpty(),
    body('lastName').optional().notEmpty(),
    body('state').optional().notEmpty(),
    body('district').optional().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const { userId } = req.params;
    const { firstName, lastName, state, district, preferences } = req.body;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (state) user.state = state;
    if (district) user.district = district;
    if (preferences) user.preferences = preferences;

    await userRepository.save(user);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  }
);

// Get users by state (for analytics)
router.get('/state/:state', async (req: Request, res: Response) => {
  const { state } = req.params;

  const users = await userRepository.find({
    where: { state, isActive: true },
  });

  res.json({
    success: true,
    data: {
      state,
      userCount: users.length,
      users: users.map(u => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        userType: u.userType,
        points: u.totalRewardPoints,
      })),
    },
  });
});

export default router;

