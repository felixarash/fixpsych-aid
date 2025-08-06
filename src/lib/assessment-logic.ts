import { generateAnalysis, generateCategoryRecommendations } from './ai-analysis';
import { assessmentCategories, AssessmentQuestion, AssessmentResult, UserInfo, CompleteAssessment } from '@/data/assessment';

export interface AssessmentAnswers {
  [questionId: string]: number;
}

export function calculateResults(answers: AssessmentAnswers): AssessmentResult[] {
  const results: AssessmentResult[] = [];

  assessmentCategories.forEach(category => {
    const categoryAnswers = category.questions
      .map(q => answers[q.id])
      .filter(answer => answer !== undefined);

    if (categoryAnswers.length === 0) return;

    const totalScore = categoryAnswers.reduce((sum, score) => sum + score, 0);
    const maxScore = category.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.value)), 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Determine severity based on percentage
    let severity: 'low' | 'moderate' | 'high' | 'severe';
    if (percentage <= 25) {
      severity = 'low';
    } else if (percentage <= 50) {
      severity = 'moderate';
    } else if (percentage <= 75) {
      severity = 'high';
    } else {
      severity = 'severe';
    }

    // Generate category-specific recommendations
    const recommendations = generateCategoryRecommendations(category.id, severity);

    results.push({
      category: category.id,
      score: totalScore,
      maxScore,
      percentage,
      severity,
      recommendations
    });
  });

  return results;
}

export function calculateOverallScore(results: AssessmentResult[]): number {
  if (results.length === 0) return 0;
  
  const totalPercentage = results.reduce((sum, result) => sum + result.percentage, 0);
  return Math.round(totalPercentage / results.length);
}

export async function generateCompleteAssessment(
  userInfo: UserInfo,
  answers: AssessmentAnswers
): Promise<CompleteAssessment> {
  const results = calculateResults(answers);
  const overallScore = calculateOverallScore(results);

  // Generate AI analysis
  const analysis = await generateAnalysis({
    userInfo,
    results,
    overallScore
  });

  return {
    userInfo,
    results,
    overallScore,
    diagnosis: analysis.diagnosis,
    analysis: analysis.analysis,
    recommendations: analysis.recommendations,
    timestamp: new Date().toISOString()
  };
}

export function getTotalQuestions(): number {
  return assessmentCategories.reduce((total, category) => total + category.questions.length, 0);
}

export function getQuestionByIndex(index: number): { question: AssessmentQuestion; categoryIndex: number; questionIndex: number } | null {
  let currentIndex = 0;
  
  for (let categoryIndex = 0; categoryIndex < assessmentCategories.length; categoryIndex++) {
    const category = assessmentCategories[categoryIndex];
    
    for (let questionIndex = 0; questionIndex < category.questions.length; questionIndex++) {
      if (currentIndex === index) {
        return {
          question: category.questions[questionIndex],
          categoryIndex,
          questionIndex
        };
      }
      currentIndex++;
    }
  }
  
  return null;
}

export function validateAnswers(answers: AssessmentAnswers): boolean {
  const totalQuestions = getTotalQuestions();
  const answeredQuestions = Object.keys(answers).length;
  
  return answeredQuestions === totalQuestions;
} 