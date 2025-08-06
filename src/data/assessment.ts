export interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  questions: AssessmentQuestion[];
}

export const assessmentCategories: AssessmentCategory[] = [
  {
    id: "depression",
    name: "Depression & Mood",
    description: "Assessment of depressive symptoms and mood disorders",
    questions: [
      {
        id: "dep_1",
        category: "depression",
        question: "How often do you feel sad, empty, or hopeless?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" },
          { value: 4, label: "Almost always" }
        ]
      },
      {
        id: "dep_2",
        category: "depression",
        question: "Do you have little interest or pleasure in doing things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: "dep_3",
        category: "depression",
        question: "How is your sleep pattern?",
        options: [
          { value: 0, label: "Normal sleep" },
          { value: 1, label: "Slight sleep issues" },
          { value: 2, label: "Moderate sleep problems" },
          { value: 3, label: "Severe sleep issues" }
        ]
      },
      {
        id: "dep_4",
        category: "depression",
        question: "Do you feel tired or have little energy?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" }
        ]
      }
    ]
  },
  {
    id: "anxiety",
    name: "Anxiety & Stress",
    description: "Evaluation of anxiety symptoms and stress levels",
    questions: [
      {
        id: "anx_1",
        category: "anxiety",
        question: "How often do you feel nervous, anxious, or on edge?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Several days" },
          { value: 2, label: "More than half the days" },
          { value: 3, label: "Nearly every day" }
        ]
      },
      {
        id: "anx_2",
        category: "anxiety",
        question: "Do you worry too much about different things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" }
        ]
      },
      {
        id: "anx_3",
        category: "anxiety",
        question: "Do you have trouble relaxing?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" }
        ]
      },
      {
        id: "anx_4",
        category: "anxiety",
        question: "Do you experience panic attacks or sudden fear?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" }
        ]
      }
    ]
  },
  {
    id: "social",
    name: "Social Functioning",
    description: "Assessment of social relationships and communication",
    questions: [
      {
        id: "soc_1",
        category: "social",
        question: "How comfortable are you in social situations?",
        options: [
          { value: 0, label: "Very comfortable" },
          { value: 1, label: "Somewhat comfortable" },
          { value: 2, label: "Uncomfortable" },
          { value: 3, label: "Very uncomfortable" }
        ]
      },
      {
        id: "soc_2",
        category: "social",
        question: "Do you avoid social situations due to fear or anxiety?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" }
        ]
      },
      {
        id: "soc_3",
        category: "social",
        question: "How would you rate your communication skills?",
        options: [
          { value: 0, label: "Excellent" },
          { value: 1, label: "Good" },
          { value: 2, label: "Fair" },
          { value: 3, label: "Poor" }
        ]
      },
      {
        id: "soc_4",
        category: "social",
        question: "Do you feel isolated or disconnected from others?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" }
        ]
      }
    ]
  },
  {
    id: "cognitive",
    name: "Cognitive Function",
    description: "Evaluation of memory, concentration, and thinking",
    questions: [
      {
        id: "cog_1",
        category: "cognitive",
        question: "How is your ability to concentrate or focus?",
        options: [
          { value: 0, label: "Excellent" },
          { value: 1, label: "Good" },
          { value: 2, label: "Fair" },
          { value: 3, label: "Poor" }
        ]
      },
      {
        id: "cog_2",
        category: "cognitive",
        question: "Do you have trouble remembering things?",
        options: [
          { value: 0, label: "Not at all" },
          { value: 1, label: "Sometimes" },
          { value: 2, label: "Often" },
          { value: 3, label: "Almost always" }
        ]
      },
      {
        id: "cog_3",
        category: "cognitive",
        question: "How is your decision-making ability?",
        options: [
          { value: 0, label: "Excellent" },
          { value: 1, label: "Good" },
          { value: 2, label: "Fair" },
          { value: 3, label: "Poor" }
        ]
      },
      {
        id: "cog_4",
        category: "cognitive",
        question: "Do you experience racing thoughts or mental fog?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" }
        ]
      }
    ]
  },
  {
    id: "behavioral",
    name: "Behavioral Patterns",
    description: "Assessment of daily behaviors and habits",
    questions: [
      {
        id: "beh_1",
        category: "behavioral",
        question: "How would you rate your daily routine and organization?",
        options: [
          { value: 0, label: "Very organized" },
          { value: 1, label: "Somewhat organized" },
          { value: 2, label: "Disorganized" },
          { value: 3, label: "Very disorganized" }
        ]
      },
      {
        id: "beh_2",
        category: "behavioral",
        question: "Do you engage in impulsive behaviors?",
        options: [
          { value: 0, label: "Never" },
          { value: 1, label: "Rarely" },
          { value: 2, label: "Sometimes" },
          { value: 3, label: "Often" }
        ]
      },
      {
        id: "beh_3",
        category: "behavioral",
        question: "How well do you manage stress and emotions?",
        options: [
          { value: 0, label: "Very well" },
          { value: 1, label: "Somewhat well" },
          { value: 2, label: "Poorly" },
          { value: 3, label: "Very poorly" }
        ]
      },
      {
        id: "beh_4",
        category: "behavioral",
        question: "Do you have healthy coping mechanisms?",
        options: [
          { value: 0, label: "Yes, very healthy" },
          { value: 1, label: "Somewhat healthy" },
          { value: 2, label: "Unhealthy" },
          { value: 3, label: "Very unhealthy" }
        ]
      }
    ]
  }
];

export interface AssessmentResult {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  severity: 'low' | 'moderate' | 'high' | 'severe';
  recommendations: string[];
}

export interface UserInfo {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  contactInfo: string;
  emergencyContact: string;
  medicalHistory: string;
  currentMedications: string;
  assessmentDate: string;
}

export interface CompleteAssessment {
  userInfo: UserInfo;
  results: AssessmentResult[];
  overallScore: number;
  diagnosis: string;
  analysis: string;
  recommendations: string[];
  timestamp: string;
} 