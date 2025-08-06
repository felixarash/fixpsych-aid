"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentQuestion } from "@/data/assessment";

interface AssessmentQuestionProps {
  question: AssessmentQuestion;
  onAnswer: (questionId: string, value: number) => void;
  currentAnswer?: number;
  questionNumber: number;
  totalQuestions: number;
}

export function AssessmentQuestionComponent({
  question,
  onAnswer,
  currentAnswer,
  questionNumber,
  totalQuestions
}: AssessmentQuestionProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="w-32 h-2 bg-secondary rounded-full">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <CardTitle className="text-lg font-semibold">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
                currentAnswer === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={currentAnswer === option.value}
                onChange={() => onAnswer(question.id, option.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                currentAnswer === option.value
                  ? "border-primary bg-primary"
                  : "border-muted-foreground"
              }`}>
                {currentAnswer === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="flex-1">{option.label}</span>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 