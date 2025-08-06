"use client";

import { useState } from "react";
import { UserInfoForm } from "@/components/UserInfoForm";
import { AssessmentQuestionComponent } from "@/components/AssessmentQuestion";
import { AssessmentResults } from "@/components/AssessmentResults";
import { generateCompleteAssessment, getTotalQuestions, getQuestionByIndex, AssessmentAnswers } from "@/lib/assessment-logic";
import { generatePDF } from "@/lib/pdf-generator";
import { UserInfo, CompleteAssessment } from "@/data/assessment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Download, ArrowLeft, ArrowRight } from "lucide-react";

type AppState = 'user-info' | 'assessment' | 'results';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('user-info');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessment, setAssessment] = useState<CompleteAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalQuestions = getTotalQuestions();
  const currentQuestion = getQuestionByIndex(currentQuestionIndex);

  const handleUserInfoComplete = (info: UserInfo) => {
    setUserInfo(info);
    setCurrentState('assessment');
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCompleteAssessment = async () => {
    if (!userInfo) return;
    
    setIsLoading(true);
    try {
      const completeAssessment = await generateCompleteAssessment(userInfo, answers);
      setAssessment(completeAssessment);
      setCurrentState('results');
    } catch (error) {
      console.error('Error generating assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!assessment) return;
    
    try {
      await generatePDF(assessment);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleRestart = () => {
    setCurrentState('user-info');
    setUserInfo(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setAssessment(null);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (currentState === 'user-info') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-primary mr-3" />
              <h1 className="text-4xl font-bold">PsychAid</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Professional Psychological Assessment & Analysis
            </p>
          </div>
          
          <UserInfoForm onComplete={handleUserInfoComplete} />
        </div>
      </div>
    );
  }

  if (currentState === 'assessment') {
    if (!currentQuestion) {
      return (
        <div className="min-h-screen bg-background p-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Assessment Complete</h1>
            <p className="text-muted-foreground mb-6">
              All questions have been answered. Click below to generate your results.
            </p>
            <Button onClick={handleCompleteAssessment} disabled={isLoading}>
              {isLoading ? "Generating Results..." : "Generate Results"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold">Psychological Assessment</h1>
            </div>
            <p className="text-muted-foreground">
              Please answer each question honestly to receive an accurate analysis
            </p>
          </div>

          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Progress: {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </CardContent>
          </Card>

          {/* Question */}
          <AssessmentQuestionComponent
            question={currentQuestion.question}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestion.question.id]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button
                onClick={handleCompleteAssessment}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? "Generating..." : "Complete Assessment"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.question.id]}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentState === 'results' && assessment) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <AssessmentResults 
            assessment={assessment} 
            onDownloadPDF={handleDownloadPDF}
          />
          
          <div className="mt-8 text-center">
            <Button onClick={handleRestart} variant="outline" className="mr-4">
              Start New Assessment
            </Button>
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
}
