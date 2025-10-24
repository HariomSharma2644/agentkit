from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class PersonalizationEngine:
    """AI-powered personalization engine"""
    
    def __init__(self):
        self.user_profiles = {}
    
    def create_profile(self, user_id: str, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a personalized user profile
        
        Args:
            user_id: User identifier
            user_data: User information (age, gender, preferences, etc.)
            
        Returns:
            Personalized profile with recommendations
        """
        try:
            profile = {
                'user_id': user_id,
                'demographics': self._extract_demographics(user_data),
                'preferences': self._extract_preferences(user_data),
                'health_profile': self._create_health_profile(user_data),
                'personalization_settings': self._create_personalization_settings(user_data),
                'recommended_actions': self._generate_recommended_actions(user_data),
            }
            
            self.user_profiles[user_id] = profile
            return profile
            
        except Exception as e:
            logger.error(f"Error creating personalization profile: {str(e)}")
            return {'error': str(e)}
    
    def _extract_demographics(self, user_data: Dict) -> Dict[str, Any]:
        """Extract demographic information"""
        return {
            'age': user_data.get('age'),
            'gender': user_data.get('gender'),
            'state': user_data.get('state'),
            'district': user_data.get('district'),
            'user_type': user_data.get('user_type', 'household'),
        }
    
    def _extract_preferences(self, user_data: Dict) -> Dict[str, Any]:
        """Extract user preferences"""
        preferences = user_data.get('preferences', {})
        
        return {
            'language': preferences.get('language', 'en'),
            'cuisine_preferences': preferences.get('cuisinePreferences', []),
            'dietary_restrictions': preferences.get('dietaryRestrictions', []),
            'health_goals': preferences.get('healthGoals', []),
            'notification_frequency': preferences.get('notificationFrequency', 'daily'),
        }
    
    def _create_health_profile(self, user_data: Dict) -> Dict[str, Any]:
        """Create health profile"""
        health_data = user_data.get('health_data', {})
        
        return {
            'age_group': self._get_age_group(user_data.get('age')),
            'bmi_category': self._get_bmi_category(health_data.get('bmi')),
            'health_conditions': health_data.get('health_conditions', []),
            'medications': health_data.get('medications', []),
            'allergies': health_data.get('allergies', []),
        }
    
    def _create_personalization_settings(self, user_data: Dict) -> Dict[str, Any]:
        """Create personalization settings"""
        return {
            'content_difficulty': 'beginner',
            'recipe_complexity': 'simple',
            'notification_type': 'push',
            'data_sharing': user_data.get('data_sharing', False),
            'community_participation': user_data.get('community_participation', False),
        }
    
    def _generate_recommended_actions(self, user_data: Dict) -> List[str]:
        """Generate recommended actions for the user"""
        actions = []
        
        # Based on user type
        user_type = user_data.get('user_type', 'household')
        if user_type == 'household':
            actions.extend([
                'Complete health assessment',
                'Set daily oil consumption goal',
                'Explore low-oil recipes',
            ])
        elif user_type == 'school':
            actions.extend([
                'Register for MDM program',
                'Set up nutrition tracking',
                'Access educational modules',
            ])
        elif user_type == 'restaurant':
            actions.extend([
                'Register low-oil menu items',
                'Get blockchain certification',
                'Join partner network',
            ])
        
        # Based on health goals
        health_goals = user_data.get('preferences', {}).get('healthGoals', [])
        if 'weight_loss' in health_goals:
            actions.append('Join weight loss challenge')
        if 'diabetes_management' in health_goals:
            actions.append('Access diabetes-friendly recipes')
        
        return actions
    
    def _get_age_group(self, age: int) -> str:
        """Get age group category"""
        if age is None:
            return 'unknown'
        elif age < 18:
            return 'child'
        elif age < 30:
            return 'young_adult'
        elif age < 50:
            return 'middle_aged'
        else:
            return 'senior'
    
    def _get_bmi_category(self, bmi: float) -> str:
        """Get BMI category"""
        if bmi is None:
            return 'unknown'
        elif bmi < 18.5:
            return 'underweight'
        elif bmi < 25:
            return 'normal'
        elif bmi < 30:
            return 'overweight'
        else:
            return 'obese'
    
    def get_profile(self, user_id: str) -> Dict[str, Any]:
        """Retrieve user profile"""
        return self.user_profiles.get(user_id, {'error': 'Profile not found'})
    
    def update_profile(self, user_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        """Update user profile"""
        if user_id not in self.user_profiles:
            return {'error': 'Profile not found'}
        
        profile = self.user_profiles[user_id]
        
        # Update preferences
        if 'preferences' in updates:
            profile['preferences'].update(updates['preferences'])
        
        # Update health profile
        if 'health_data' in updates:
            profile['health_profile'].update(updates['health_data'])
        
        return profile

