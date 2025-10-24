import numpy as np
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class HealthAnalyzer:
    """AI-powered health risk assessment engine"""
    
    def __init__(self):
        self.risk_thresholds = {
            'bmi': {'normal': 25, 'overweight': 30, 'obese': 35},
            'oil_intake': {'recommended': 33.3, 'moderate_excess': 50, 'high_excess': 75},
            'blood_pressure': {'normal': 120, 'elevated': 140, 'high': 160},
            'cholesterol': {'normal': 200, 'borderline': 240},
        }
    
    def assess_risk(self, metrics: Dict[str, Any]) -> Dict[str, Any]:
        """
        Assess health risk based on provided metrics
        
        Args:
            metrics: Health metrics (BMI, oil intake, blood pressure, etc.)
            
        Returns:
            Risk assessment with score, level, and recommendations
        """
        try:
            risk_score = 0
            risk_factors = []
            recommendations = []
            
            # Assess BMI
            if 'bmi' in metrics:
                bmi_risk, bmi_factors = self._assess_bmi(metrics['bmi'])
                risk_score += bmi_risk
                risk_factors.extend(bmi_factors)
            
            # Assess oil intake
            if 'daily_oil_intake' in metrics:
                oil_risk, oil_factors = self._assess_oil_intake(metrics['daily_oil_intake'])
                risk_score += oil_risk
                risk_factors.extend(oil_factors)
            
            # Assess blood pressure
            if 'blood_pressure_systolic' in metrics:
                bp_risk, bp_factors = self._assess_blood_pressure(
                    metrics['blood_pressure_systolic'],
                    metrics.get('blood_pressure_diastolic', 0)
                )
                risk_score += bp_risk
                risk_factors.extend(bp_factors)
            
            # Assess cholesterol
            if 'cholesterol' in metrics:
                chol_risk, chol_factors = self._assess_cholesterol(metrics['cholesterol'])
                risk_score += chol_risk
                risk_factors.extend(chol_factors)
            
            # Normalize score to 0-100
            risk_score = min(100, max(0, risk_score))
            
            # Determine risk level
            risk_level = self._get_risk_level(risk_score)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(risk_factors, risk_level)
            
            return {
                'risk_score': float(risk_score),
                'risk_level': risk_level,
                'risk_factors': risk_factors,
                'recommendations': recommendations,
                'metrics_analyzed': list(metrics.keys())
            }
            
        except Exception as e:
            logger.error(f"Error in health risk assessment: {str(e)}")
            return {'error': str(e)}
    
    def _assess_bmi(self, bmi: float) -> tuple:
        """Assess BMI-related risk"""
        risk = 0
        factors = []
        
        if bmi >= self.risk_thresholds['bmi']['obese']:
            risk = 30
            factors.append('Obesity (BMI >= 30)')
        elif bmi >= self.risk_thresholds['bmi']['overweight']:
            risk = 15
            factors.append('Overweight (BMI 25-29.9)')
        
        return risk, factors
    
    def _assess_oil_intake(self, daily_intake: float) -> tuple:
        """Assess oil intake-related risk"""
        risk = 0
        factors = []
        recommended = self.risk_thresholds['oil_intake']['recommended']
        
        excess_percentage = ((daily_intake - recommended) / recommended) * 100
        
        if excess_percentage > 100:
            risk = 35
            factors.append(f'Excessive oil consumption (>100% above recommended)')
        elif excess_percentage > 50:
            risk = 25
            factors.append(f'High oil consumption (50-100% above recommended)')
        elif excess_percentage > 0:
            risk = 15
            factors.append(f'Above recommended oil intake')
        
        return risk, factors
    
    def _assess_blood_pressure(self, systolic: float, diastolic: float) -> tuple:
        """Assess blood pressure-related risk"""
        risk = 0
        factors = []
        
        if systolic >= 160 or diastolic >= 100:
            risk = 25
            factors.append('High blood pressure (Stage 2)')
        elif systolic >= 140 or diastolic >= 90:
            risk = 15
            factors.append('Elevated blood pressure (Stage 1)')
        
        return risk, factors
    
    def _assess_cholesterol(self, cholesterol: float) -> tuple:
        """Assess cholesterol-related risk"""
        risk = 0
        factors = []
        
        if cholesterol >= 240:
            risk = 20
            factors.append('High cholesterol (>= 240 mg/dL)')
        elif cholesterol >= 200:
            risk = 10
            factors.append('Borderline high cholesterol (200-239 mg/dL)')
        
        return risk, factors
    
    def _get_risk_level(self, score: float) -> str:
        """Determine risk level from score"""
        if score >= 70:
            return 'critical'
        elif score >= 50:
            return 'high'
        elif score >= 25:
            return 'moderate'
        else:
            return 'low'
    
    def _generate_recommendations(self, factors: List[str], level: str) -> List[str]:
        """Generate health recommendations based on risk factors"""
        recommendations = []
        
        if any('oil' in f.lower() for f in factors):
            recommendations.append('Reduce daily oil intake gradually')
            recommendations.append('Use low-oil cooking methods: steaming, grilling, baking')
            recommendations.append('Try air-frying instead of deep-frying')
        
        if any('obesity' in f.lower() or 'overweight' in f.lower() for f in factors):
            recommendations.append('Increase physical activity to 150 minutes per week')
            recommendations.append('Consult a nutritionist for personalized diet plan')
        
        if any('blood pressure' in f.lower() for f in factors):
            recommendations.append('Reduce salt intake')
            recommendations.append('Increase potassium-rich foods')
            recommendations.append('Consult a healthcare provider')
        
        if any('cholesterol' in f.lower() for f in factors):
            recommendations.append('Increase fiber intake')
            recommendations.append('Reduce saturated fat consumption')
        
        if level == 'critical':
            recommendations.insert(0, 'Seek immediate medical consultation')
        
        return recommendations

