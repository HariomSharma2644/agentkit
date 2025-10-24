import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../database/data-source';
import { Recipe } from '../entities/Recipe';
import { ValidationError } from '../middleware/error-handler';

const router = Router();
const recipeRepository = AppDataSource.getRepository(Recipe);

// Get low-oil recipes
router.get('/low-oil', async (req: Request, res: Response) => {
  const { cuisineType, dietaryRestrictions, limit = 20 } = req.query;

  let query = recipeRepository.createQueryBuilder('recipe')
    .where('recipe.oilCategory = :oilCategory', { oilCategory: 'low-oil' })
    .andWhere('recipe.isActive = :isActive', { isActive: true });

  if (cuisineType) {
    query = query.andWhere('recipe.cuisineType = :cuisineType', { cuisineType });
  }

  const recipes = await query.limit(parseInt(limit as string)).getMany();

  res.json({
    success: true,
    data: recipes,
  });
});

// Get recipe recommendations
router.get('/recommendations/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { limit = 10 } = req.query;

  // Get user preferences from database
  // For now, return popular low-oil recipes
  const recipes = await recipeRepository.find({
    where: { oilCategory: 'low-oil', isActive: true },
    order: { averageRating: 'DESC' },
    take: parseInt(limit as string),
  });

  res.json({
    success: true,
    data: recipes,
  });
});

// Create recipe
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('cuisineType').notEmpty(),
    body('oilQuantityGrams').isFloat({ min: 0 }),
    body('ingredients').isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError('Validation failed', errors.array());
    }

    const {
      name,
      description,
      cuisineType,
      oilQuantityGrams,
      servings,
      caloriesPerServing,
      fatPerServing,
      ingredients,
      instructions,
      tags,
      healthBenefits,
      dietaryRestrictions,
    } = req.body;

    const oilCategory = oilQuantityGrams <= 5 ? 'low-oil' : oilQuantityGrams <= 15 ? 'medium-oil' : 'high-oil';

    const recipe = recipeRepository.create({
      name,
      description,
      cuisineType,
      oilQuantityGrams,
      servings,
      caloriesPerServing,
      fatPerServing,
      ingredients,
      instructions,
      tags,
      healthBenefits,
      dietaryRestrictions,
      oilCategory,
    });

    await recipeRepository.save(recipe);

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe,
    });
  }
);

// Get recipe by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const recipe = await recipeRepository.findOne({ where: { id } });

  if (!recipe) {
    throw new ValidationError('Recipe not found');
  }

  res.json({
    success: true,
    data: recipe,
  });
});

export default router;

