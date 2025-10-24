import numpy as np
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

class ConsumptionPredictor:
    """AI-powered consumption prediction engine"""
    
    def __init__(self):
        self.model_params = {}
    
    def predict(self, user_id: str, historical_data: List[Dict]) -> Dict[str, Any]:
        """
        Predict future oil consumption based on historical data
        
        Args:
            user_id: User identifier
            historical_data: List of historical consumption records
            
        Returns:
            Prediction with forecast and trend analysis
        """
        try:
            if not historical_data or len(historical_data) < 3:
                return {
                    'error': 'Insufficient historical data for prediction',
                    'min_required': 3,
                    'provided': len(historical_data)
                }
            
            # Extract consumption values
            consumption_values = [record.get('oil_quantity', 0) for record in historical_data]
            
            # Calculate trend
            trend = self._calculate_trend(consumption_values)
            
            # Predict next 7 days
            predictions = self._predict_next_days(consumption_values, days=7)
            
            # Calculate statistics
            stats = self._calculate_statistics(consumption_values)
            
            # Generate insights
            insights = self._generate_insights(consumption_values, trend, stats)
            
            return {
                'user_id': user_id,
                'current_average': float(np.mean(consumption_values)),
                'trend': trend,
                'predictions': {
                    'next_7_days': [float(p) for p in predictions],
                    'next_30_days_average': float(np.mean(predictions) * 4.3),  # Approximate
                },
                'statistics': stats,
                'insights': insights,
                'recommendation': self._get_recommendation(trend, stats)
            }
            
        except Exception as e:
            logger.error(f"Error in consumption prediction: {str(e)}")
            return {'error': str(e)}
    
    def _calculate_trend(self, values: List[float]) -> str:
        """Calculate consumption trend"""
        if len(values) < 2:
            return 'insufficient_data'
        
        # Simple linear regression
        x = np.arange(len(values))
        y = np.array(values)
        
        # Calculate slope
        slope = np.polyfit(x, y, 1)[0]
        
        if slope > 0.5:
            return 'increasing'
        elif slope < -0.5:
            return 'decreasing'
        else:
            return 'stable'
    
    def _predict_next_days(self, values: List[float], days: int = 7) -> np.ndarray:
        """Predict consumption for next N days"""
        x = np.arange(len(values))
        y = np.array(values)
        
        # Fit polynomial (degree 2)
        coeffs = np.polyfit(x, y, 2)
        poly = np.poly1d(coeffs)
        
        # Predict next days
        future_x = np.arange(len(values), len(values) + days)
        predictions = poly(future_x)
        
        # Ensure non-negative predictions
        predictions = np.maximum(predictions, 0)
        
        return predictions
    
    def _calculate_statistics(self, values: List[float]) -> Dict[str, float]:
        """Calculate consumption statistics"""
        values_array = np.array(values)
        
        return {
            'mean': float(np.mean(values_array)),
            'median': float(np.median(values_array)),
            'std_dev': float(np.std(values_array)),
            'min': float(np.min(values_array)),
            'max': float(np.max(values_array)),
            'total': float(np.sum(values_array)),
        }
    
    def _generate_insights(self, values: List[float], trend: str, stats: Dict) -> List[str]:
        """Generate insights from consumption data"""
        insights = []
        
        # Trend insights
        if trend == 'increasing':
            insights.append('Your oil consumption is increasing. Consider reducing portion sizes.')
        elif trend == 'decreasing':
            insights.append('Great! Your oil consumption is decreasing. Keep up the good work!')
        else:
            insights.append('Your oil consumption is stable. Aim to reduce it further.')
        
        # Variability insights
        if stats['std_dev'] > stats['mean'] * 0.5:
            insights.append('Your consumption varies significantly. Try to maintain consistency.')
        
        # Comparison insights
        recommended_daily = 33.3  # ICMR recommendation
        if stats['mean'] > recommended_daily:
            excess = ((stats['mean'] - recommended_daily) / recommended_daily) * 100
            insights.append(f'Your average consumption is {excess:.1f}% above recommended levels.')
        else:
            insights.append('Your average consumption is within recommended levels!')
        
        return insights
    
    def _get_recommendation(self, trend: str, stats: Dict) -> str:
        """Get personalized recommendation"""
        recommended_daily = 33.3
        
        if stats['mean'] > recommended_daily * 1.5:
            return 'Urgent: Significantly reduce oil intake. Consult a nutritionist.'
        elif stats['mean'] > recommended_daily:
            return 'Moderate: Gradually reduce oil intake to recommended levels.'
        elif trend == 'increasing':
            return 'Caution: Your consumption is increasing. Maintain current levels.'
        else:
            return 'Good: Continue your healthy consumption habits.'

