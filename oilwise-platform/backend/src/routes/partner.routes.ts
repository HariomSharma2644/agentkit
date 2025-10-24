import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { Partner } from '../entities/Partner';
import { ValidationError, NotFoundError } from '../middleware/error-handler';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const partnerRepository = AppDataSource.getRepository(Partner);

// Register partner
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('partnerType').notEmpty(),
    body('address').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const {
      name,
      email,
      phoneNumber,
      partnerType,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const partner = partnerRepository.create({
      name,
      email,
      phoneNumber,
      partnerType,
      address,
      city,
      state,
      pincode,
      apiKey: uuidv4(),
    });

    await partnerRepository.save(partner);

    res.status(201).json({
      success: true,
      message: 'Partner registered successfully',
      data: {
        id: partner.id,
        name: partner.name,
        apiKey: partner.apiKey,
      },
    });
  }
);

// Get partner details
router.get('/:partnerId', async (req: Request, res: Response) => {
  const { partnerId } = req.params;

  const partner = await partnerRepository.findOne({ where: { id: partnerId } });

  if (!partner) {
    throw new NotFoundError('Partner not found');
  }

  res.json({
    success: true,
    data: partner,
  });
});

// Update low-oil products
router.put(
  '/:partnerId/products',
  [
    body('lowOilProducts').isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const { partnerId } = req.params;
    const { lowOilProducts } = req.body;

    const partner = await partnerRepository.findOne({ where: { id: partnerId } });

    if (!partner) {
      throw new NotFoundError('Partner not found');
    }

    partner.lowOilProducts = lowOilProducts;
    await partnerRepository.save(partner);

    res.json({
      success: true,
      message: 'Products updated successfully',
      data: partner,
    });
  }
);

// Get all verified partners
router.get('/list/verified', async (req: Request, res: Response) => {
  const { partnerType, state, limit = 50 } = req.query;

  let query = partnerRepository.createQueryBuilder('partner')
    .where('partner.isVerified = :isVerified', { isVerified: true })
    .andWhere('partner.isActive = :isActive', { isActive: true });

  if (partnerType) {
    query = query.andWhere('partner.partnerType = :partnerType', { partnerType });
  }

  if (state) {
    query = query.andWhere('partner.state = :state', { state });
  }

  const partners = await query.limit(parseInt(limit as string)).getMany();

  res.json({
    success: true,
    data: partners,
  });
});

export default router;

