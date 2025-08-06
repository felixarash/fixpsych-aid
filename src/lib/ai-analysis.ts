import { AssessmentResult, UserInfo } from '@/data/assessment';

// Using a free AI API (Hugging Face Inference API with a free model)
const API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const API_KEY = ""; // You can get a free API key from Hugging Face

interface AnalysisRequest {
  userInfo: UserInfo;
  results: AssessmentResult[];
  overallScore: number;
}

interface AnalysisResponse {
  diagnosis: string;
  analysis: string;
  recommendations: string[];
}

// Fallback analysis when API is not available
function generateFallbackAnalysis(request: AnalysisRequest): AnalysisResponse {
  const { userInfo, results, overallScore } = request;
  
  // Determine overall severity
  const severityLevels = results.map(r => r.severity);
  const hasSevere = severityLevels.includes('severe');
  const hasHigh = severityLevels.includes('high');
  const hasModerate = severityLevels.includes('moderate');
  
  let diagnosis = "";
  let analysis = "";
  let recommendations: string[] = [];

  if (overallScore >= 80) {
    diagnosis = "Good psychological well-being with minor areas for improvement";
    analysis = `Based on the assessment, ${userInfo.name} demonstrates good overall psychological health with a score of ${overallScore}%. The individual shows healthy patterns across most categories, with some minor areas that could benefit from attention.`;
    recommendations = [
      "Continue maintaining current healthy lifestyle habits",
      "Consider mindfulness or meditation practices for stress management",
      "Maintain regular social connections and support networks",
      "Schedule regular check-ins with mental health professionals"
    ];
  } else if (overallScore >= 60) {
    diagnosis = "Moderate psychological well-being with some concerns";
    analysis = `The assessment indicates moderate psychological well-being (${overallScore}%) with several areas requiring attention. ${userInfo.name} may benefit from targeted interventions to improve specific aspects of mental health.`;
    recommendations = [
      "Consider seeking professional mental health support",
      "Implement stress management techniques",
      "Develop healthy coping mechanisms",
      "Establish regular sleep and exercise routines"
    ];
  } else if (overallScore >= 40) {
    diagnosis = "Significant psychological concerns requiring attention";
    analysis = `The assessment reveals significant psychological concerns with an overall score of ${overallScore}%. ${userInfo.name} is experiencing notable difficulties that warrant professional intervention.`;
    recommendations = [
      "Seek immediate professional mental health support",
      "Consider therapy or counseling services",
      "Develop a comprehensive treatment plan with healthcare providers",
      "Establish emergency support contacts"
    ];
  } else {
    diagnosis = "Severe psychological distress requiring immediate intervention";
    analysis = `The assessment indicates severe psychological distress (${overallScore}%) requiring immediate professional attention. ${userInfo.name} is experiencing significant mental health challenges that need urgent care.`;
    recommendations = [
      "Seek immediate professional mental health intervention",
      "Contact emergency mental health services if needed",
      "Develop a comprehensive treatment plan",
      "Establish strong support networks"
    ];
  }

  // Add category-specific recommendations
  results.forEach(result => {
    if (result.severity === 'severe' || result.severity === 'high') {
      recommendations.push(...result.recommendations);
    }
  });

  return { diagnosis, analysis, recommendations };
}

// Enhanced analysis with more sophisticated logic
export async function generateAnalysis(request: AnalysisRequest): Promise<AnalysisResponse> {
  try {
    // Try to use AI API if available
    if (API_KEY) {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `Analyze this psychological assessment: ${JSON.stringify(request)}`,
          parameters: {
            max_length: 500,
            temperature: 0.7
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Parse AI response and extract analysis
        // This would need to be adapted based on the actual API response format
        return {
          diagnosis: "AI-generated diagnosis based on assessment data",
          analysis: "AI-generated detailed analysis of psychological patterns and symptoms",
          recommendations: ["AI-generated personalized recommendations"]
        };
      }
    }
  } catch (error) {
    console.warn("AI API not available, using fallback analysis:", error);
  }

  // Use fallback analysis
  return generateFallbackAnalysis(request);
}

// Generate category-specific recommendations
export function generateCategoryRecommendations(category: string, severity: string, score: number): string[] {
  const recommendations: { [key: string]: { [key: string]: string[] } } = {
    depression: {
      low: [
        "Maintain current positive mood patterns",
        "Continue engaging in enjoyable activities",
        "Practice gratitude exercises"
      ],
      moderate: [
        "Consider talking to a mental health professional",
        "Increase physical activity and social engagement",
        "Practice mindfulness and relaxation techniques"
      ],
      high: [
        "Seek professional mental health support immediately",
        "Consider medication evaluation with a psychiatrist",
        "Develop a comprehensive treatment plan"
      ],
      severe: [
        "Seek immediate professional intervention",
        "Consider inpatient treatment if necessary",
        "Establish emergency support contacts"
      ]
    },
    anxiety: {
      low: [
        "Continue current stress management practices",
        "Maintain healthy lifestyle habits",
        "Practice regular relaxation techniques"
      ],
      moderate: [
        "Learn and practice anxiety management techniques",
        "Consider cognitive behavioral therapy",
        "Reduce caffeine and stimulant intake"
      ],
      high: [
        "Seek professional anxiety treatment",
        "Consider medication evaluation",
        "Practice daily relaxation and breathing exercises"
      ],
      severe: [
        "Seek immediate professional intervention",
        "Consider anti-anxiety medication evaluation",
        "Develop comprehensive anxiety management plan"
      ]
    },
    social: {
      low: [
        "Continue maintaining healthy social connections",
        "Engage in community activities",
        "Practice active listening skills"
      ],
      moderate: [
        "Gradually increase social interactions",
        "Consider social skills training",
        "Join support groups or clubs"
      ],
      high: [
        "Seek professional help for social anxiety",
        "Consider exposure therapy",
        "Practice social skills in safe environments"
      ],
      severe: [
        "Seek immediate professional intervention",
        "Consider intensive social skills therapy",
        "Develop gradual exposure plan"
      ]
    },
    cognitive: {
      low: [
        "Continue current cognitive activities",
        "Engage in brain-training exercises",
        "Maintain healthy sleep patterns"
      ],
      moderate: [
        "Practice memory and concentration exercises",
        "Consider cognitive behavioral therapy",
        "Establish consistent daily routines"
      ],
      high: [
        "Seek professional cognitive evaluation",
        "Consider neuropsychological assessment",
        "Implement cognitive rehabilitation strategies"
      ],
      severe: [
        "Seek immediate professional evaluation",
        "Consider comprehensive neurological assessment",
        "Develop cognitive support strategies"
      ]
    },
    behavioral: {
      low: [
        "Maintain current healthy behavioral patterns",
        "Continue positive habit formation",
        "Practice self-monitoring techniques"
      ],
      moderate: [
        "Develop structured daily routines",
        "Practice impulse control strategies",
        "Consider behavioral therapy"
      ],
      high: [
        "Seek professional behavioral therapy",
        "Develop comprehensive behavior management plan",
        "Consider medication evaluation"
      ],
      severe: [
        "Seek immediate professional intervention",
        "Consider intensive behavioral therapy",
        "Develop comprehensive treatment plan"
      ]
    }
  };

  return recommendations[category]?.[severity] || [
    "Consider seeking professional mental health support",
    "Practice self-care and stress management",
    "Maintain healthy lifestyle habits"
  ];
} 