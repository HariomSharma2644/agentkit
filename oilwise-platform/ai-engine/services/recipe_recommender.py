import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class RecipeRecommender:
    """AI-powered recipe recommendation engine"""
    
    def __init__(self):
        self.recipe_features = {}
        self.user_profiles = {}
        
    def get_recommendations(self, user_id: str, preferences: Dict[str, Any]) -> List[Dict]:
        """
        Get personalized recipe recommendations for a user
        
        Args:
            user_id: User identifier
            preferences: User preferences (cuisine, dietary restrictions, etc.)
            
        Returns:
            List of recommended recipes
        """
        try:
            # Extract user preferences
            cuisine_types = preferences.get('cuisinePreferences', [])
            dietary_restrictions = preferences.get('dietaryRestrictions', [])
            health_goals = preferences.get('healthGoals', [])
            
            # Create user feature vector
            user_vector = self._create_user_vector(
                cuisine_types, 
                dietary_restrictions, 
                health_goals
            )
            
            # Get recipe candidates (low-oil recipes)
            recipe_candidates = self._get_recipe_candidates(cuisine_types)
            
            # Score recipes based on similarity
            scored_recipes = self._score_recipes(user_vector, recipe_candidates)
            
            # Return top recommendations
            return sorted(scored_recipes, key=lambda x: x['score'], reverse=True)[:10]
            
        except Exception as e:
            logger.error(f"Error in recipe recommendation: {str(e)}")
            return []
    
    def _create_user_vector(self, cuisines: List[str], restrictions: List[str], goals: List[str]) -> np.ndarray:
        """Create a feature vector for user preferences"""
        # This would be expanded with actual feature engineering
        vector = np.zeros(50)  # 50-dimensional feature space
        
        # Encode cuisine preferences
        cuisine_map = {'north_indian': 0, 'south_indian': 5, 'bengali': 10, 'gujarati': 15}
        for cuisine in cuisines:
            if cuisine in cuisine_map:
                vector[cuisine_map[cuisine]] = 1
        
        # Encode dietary restrictions
        restriction_map = {'vegetarian': 20, 'vegan': 21, 'gluten_free': 22}
        for restriction in restrictions:
            if restriction in restriction_map:
                vector[restriction_map[restriction]] = 1
        
        # Encode health goals
        goal_map = {'weight_loss': 30, 'diabetes_management': 31, 'heart_health': 32}
        for goal in goals:
            if goal in goal_map:
                vector[goal_map[goal]] = 1
        
        return vector
    
    def _get_recipe_candidates(self, cuisines: List[str]) -> List[Dict]:
        """Get candidate recipes based on cuisine preferences"""
        # This would query the database for recipes
        # For now, return mock data
        return [
            {
                'id': 'recipe_1',
                'name': 'Low-Oil Dosa',
                'cuisine': 'south_indian',
                'oil_content': 3,
                'features': np.random.rand(50)
            },
            {
                'id': 'recipe_2',
                'name': 'Steamed Idli',
                'cuisine': 'south_indian',
                'oil_content': 1,
                'features': np.random.rand(50)
            },
            {
                'id': 'recipe_3',
                'name': 'Grilled Tandoori Chicken',
                'cuisine': 'north_indian',
                'oil_content': 2,
                'features': np.random.rand(50)
            },
        ]
    
    def _score_recipes(self, user_vector: np.ndarray, recipes: List[Dict]) -> List[Dict]:
        """Score recipes based on user preferences"""
        scored = []
        
        for recipe in recipes:
            # Calculate similarity
            similarity = cosine_similarity([user_vector], [recipe['features']])[0][0]
            
            # Adjust score based on oil content (prefer lower oil)
            oil_penalty = recipe['oil_content'] / 10
            
            final_score = (similarity * 0.7) + ((1 - oil_penalty) * 0.3)
            
            scored.append({
                'id': recipe['id'],
                'name': recipe['name'],
                'cuisine': recipe['cuisine'],
                'oil_content': recipe['oil_content'],
                'score': float(final_score)
            })
        
        return scored

