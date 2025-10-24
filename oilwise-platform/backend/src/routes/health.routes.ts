import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { HealthMetric } from '../entities/HealthMetric';
import { ValidationError } from '../middleware/error-handler';

const router = Router();
const healthRepository = AppDataSource.getRepository(HealthMetric);

// Calculate health risk score
function calculateHealthRiskScore(
  bmi: number,
  dailyOilIntake: number,
  recommendedIntake: number,
  bloodPressure?: number,
  cholesterol?: number
): { score: number; level: string; factors: string[] } {
  let score = 0;
  const factors: string[] = [];

  // BMI assessment
  if (bmi >= 30) {
    score += 30;
    factors.push('Obesity (BMI >= 30)');
  } else if (bmi >= 25) {
    score += 15;
    factors.push('Overweight (BMI 25-29.9)');
  }

  // Oil intake assessment
  const oilExcess = ((dailyOilIntake - recommendedIntake) / recommendedIntake) * 100;
  if (oilExcess > 50) {
    score += 35;
    factors.push('Excessive oil consumption (>50% above recommended)');
  } else if (oilExcess > 0) {
    score += 20;
    factors.push('Above recommended oil intake');
  }

  // Blood pressure
  if (bloodPressure && bloodPressure > 140) {
    score += 20;
    factors.push('High blood pressure');
  }

  // Cholesterol
  if (cholesterol && cholesterol > 200) {
    score += 15;
    factors.push('High cholesterol');
  }

  const level = score >= 70 ? 'critical' : score >= 50 ? 'high' : score >= 25 ? 'moderate' : 'low';

  return { score: Math.min(score, 100), level, factors };
}

// Record health metrics
router.post(
  '/metrics',
  [
    body('userId').notEmpty(),
    body('weight').optional().isFloat({ min: 0 }),
    body('height').optional().isFloat({ min: 0 }),
    body('dailyOilIntake').isFloat({ min: 0 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const {
      userId,
      weight,
      height,
      bmi,
      bloodPressureSystolic,
      bloodPressureDiastolic,
      cholesterol,
      bloodSugar,
      dailyOilIntake,
    } = req.body;

    const recommendedIntake = 33.3; // ICMR recommended: 12kg/year = 33.3g/day

    const { score, level, factors } = calculateHealthRiskScore(
      bmi || 0,
      dailyOilIntake,
      recommendedIntake,
      bloodPressureSystolic,
      cholesterol
    );

    const metric = healthRepository.create({
      userId,
      weight,
      height,
      bmi,
      bloodPressureSystolic,
      bloodPressureDiastolic,
      cholesterol,
      bloodSugar,
      dailyOilIntake,
      recommendedOilIntake: recommendedIntake,
      healthRiskScore: score,
      riskLevel: level,
      riskFactors: factors,
      recommendations: generateRecommendations(level, factors),
    });

    await healthRepository.save(metric);

    res.status(201).json({
      success: true,
      message: 'Health metrics recorded',
      data: metric,
    });
  }
);

// Get health metrics
router.get('/metrics/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  const metrics = await healthRepository.find({
    where: { userId },
    order: { recordedAt: 'DESC' },
    take: 10,
  });

  res.json({
    success: true,
    data: metrics,
  });
});

function generateRecommendations(level: string, factors: string[]): string[] {
  const recommendations: string[] = [];

  if (factors.some(f => f.includes('oil'))) {
    recommendations.push('Reduce daily oil intake gradually');
    recommendations.push('Use low-oil cooking methods like steaming and grilling');
  }

  if (factors.some(f => f.includes('Obesity'))) {
    recommendations.push('Increase physical activity to 150 minutes per week');
    recommendations.push('Consult a nutritionist for personalized diet plan');
  }

  if (factors.some(f => f.includes('blood pressure'))) {
    recommendations.push('Reduce salt intake');
    recommendations.push('Consult a healthcare provider');
  }

  return recommendations;
}

export default router;

