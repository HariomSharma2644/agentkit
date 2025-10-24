import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { BlockchainCertificate } from '../entities/BlockchainCertificate';
import { ValidationError, NotFoundError } from '../middleware/error-handler';
import crypto from 'crypto';

const router = Router();
const certificateRepository = AppDataSource.getRepository(BlockchainCertificate);

// Create blockchain certificate
router.post(
  '/certificate/create',
  [
    body('partnerId').notEmpty(),
    body('productName').notEmpty(),
    body('oilContent').isFloat({ min: 0 }),
    body('certificationType').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const {
      partnerId,
      productName,
      oilContent,
      certificationType,
      verificationData,
    } = req.body;

    // Generate blockchain hash
    const blockchainHash = crypto
      .createHash('sha256')
      .update(`${partnerId}${productName}${oilContent}${Date.now()}`)
      .digest('hex');

    const certificate = certificateRepository.create({
      partnerId,
      productName,
      oilContent,
      certificationType,
      blockchainHash,
      transactionHash: `0x${crypto.randomBytes(32).toString('hex')}`,
      verificationData: verificationData || {
        verifiedBy: 'OilWise Verification Team',
        verificationDate: new Date().toISOString(),
        testResults: {},
        certificationBody: 'OilWise Platform',
      },
      status: 'pending',
    });

    await certificateRepository.save(certificate);

    res.status(201).json({
      success: true,
      message: 'Certificate created and pending verification',
      data: certificate,
    });
  }
);

// Verify certificate
router.post(
  '/certificate/:certificateId/verify',
  async (req: Request, res: Response) => {
    const { certificateId } = req.params;

    const certificate = await certificateRepository.findOne({
      where: { id: certificateId },
    });

    if (!certificate) {
      throw new NotFoundError('Certificate not found');
    }

    certificate.status = 'verified';
    certificate.expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year

    await certificateRepository.save(certificate);

    res.json({
      success: true,
      message: 'Certificate verified successfully',
      data: certificate,
    });
  }
);

// Get certificate
router.get('/certificate/:certificateId', async (req: Request, res: Response) => {
  const { certificateId } = req.params;

  const certificate = await certificateRepository.findOne({
    where: { id: certificateId },
  });

  if (!certificate) {
    throw new NotFoundError('Certificate not found');
  }

  res.json({
    success: true,
    data: certificate,
  });
});

// Get partner certificates
router.get('/partner/:partnerId/certificates', async (req: Request, res: Response) => {
  const { partnerId } = req.params;

  const certificates = await certificateRepository.find({
    where: { partnerId },
    order: { createdAt: 'DESC' },
  });

  res.json({
    success: true,
    data: certificates,
  });
});

// Verify certificate authenticity
router.post(
  '/verify/authenticity',
  [
    body('blockchainHash').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const { blockchainHash } = req.body;

    const certificate = await certificateRepository.findOne({
      where: { blockchainHash },
    });

    if (!certificate) {
      return res.json({
        success: true,
        data: {
          isAuthentic: false,
          message: 'Certificate not found on blockchain',
        },
      });
    }

    res.json({
      success: true,
      data: {
        isAuthentic: certificate.status === 'verified',
        certificate: {
          productName: certificate.productName,
          oilContent: certificate.oilContent,
          certificationType: certificate.certificationType,
          status: certificate.status,
          verificationData: certificate.verificationData,
        },
      },
    });
  }
);

export default router;

