import axios from 'axios'
import config from '../config/config'

interface RiskAssessmentData {
  amount: number
  term: number
  purpose: string
  userId: string
  creditScore?: number
  income?: number
  employmentStatus?: string
}

interface RiskAssessmentResult {
  riskScore: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  recommendation: 'APPROVE' | 'REVIEW' | 'REJECT'
  factors: string[]
}

export const assessRisk = async (data: RiskAssessmentData): Promise<RiskAssessmentResult> => {
  try {
    // For now, implement a basic risk assessment
    // In production, this would call an AI service or use a more sophisticated model
    
    const { amount, term, creditScore = 650, income = 50000 } = data
    
    let riskScore = 0
    const factors: string[] = []
    
    // Amount risk factor
    if (amount > 100000) {
      riskScore += 30
      factors.push('High loan amount')
    } else if (amount > 50000) {
      riskScore += 15
      factors.push('Medium loan amount')
    }
    
    // Term risk factor
    if (term > 60) {
      riskScore += 20
      factors.push('Long repayment term')
    } else if (term > 36) {
      riskScore += 10
      factors.push('Medium repayment term')
    }
    
    // Credit score factor
    if (creditScore < 600) {
      riskScore += 40
      factors.push('Low credit score')
    } else if (creditScore < 700) {
      riskScore += 20
      factors.push('Fair credit score')
    }
    
    // Income to loan ratio
    const debtToIncomeRatio = (amount * 12) / (term * income)
    if (debtToIncomeRatio > 0.4) {
      riskScore += 25
      factors.push('High debt-to-income ratio')
    } else if (debtToIncomeRatio > 0.3) {
      riskScore += 15
      factors.push('Moderate debt-to-income ratio')
    }
    
    // Determine risk level and recommendation
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
    let recommendation: 'APPROVE' | 'REVIEW' | 'REJECT'
    
    if (riskScore <= 30) {
      riskLevel = 'LOW'
      recommendation = 'APPROVE'
    } else if (riskScore <= 60) {
      riskLevel = 'MEDIUM'
      recommendation = 'REVIEW'
    } else {
      riskLevel = 'HIGH'
      recommendation = 'REJECT'
    }
    
    return {
      riskScore,
      riskLevel,
      recommendation,
      factors
    }
    
  } catch (error) {
    console.error('Risk assessment error:', error)
    // Return a conservative assessment on error
    return {
      riskScore: 75,
      riskLevel: 'HIGH',
      recommendation: 'REVIEW',
      factors: ['Assessment service unavailable']
    }
  }
}

export default { assessRisk }