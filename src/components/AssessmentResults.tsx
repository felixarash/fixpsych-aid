"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CompleteAssessment } from "@/data/assessment";
import { Download, FileText, Brain, Activity } from "lucide-react";

interface AssessmentResultsProps {
  assessment: CompleteAssessment;
  onDownloadPDF: () => void;
}

export function AssessmentResults({ assessment, onDownloadPDF }: AssessmentResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-500';
      case 'moderate': return 'text-yellow-500';
      case 'high': return 'text-orange-500';
      case 'severe': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/10 border-green-500/20';
      case 'moderate': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'high': return 'bg-orange-500/10 border-orange-500/20';
      case 'severe': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Assessment Results</CardTitle>
              <CardDescription>
                Psychological analysis completed on {assessment.userInfo.assessmentDate}
              </CardDescription>
            </div>
            <Button onClick={onDownloadPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Patient Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{assessment.userInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">{assessment.userInfo.age} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium capitalize">{assessment.userInfo.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Occupation</p>
              <p className="font-medium">{assessment.userInfo.occupation || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Overall Assessment Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{assessment.overallScore}%</div>
            <Progress value={assessment.overallScore} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Overall psychological well-being score
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Detailed Analysis by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessment.results.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold capitalize">{result.category}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityBgColor(result.severity)} ${getSeverityColor(result.severity)}`}>
                    {result.severity.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score: {result.score}/{result.maxScore}</span>
                    <span>{result.percentage}%</span>
                  </div>
                  <Progress value={result.percentage} className="w-full" />
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Recommendations:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diagnosis */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Diagnosis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm leading-relaxed">{assessment.diagnosis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-invert max-w-none">
            <p className="text-sm leading-relaxed">{assessment.analysis}</p>
          </div>
        </CardContent>
      </Card>

      {/* General Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>General Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {assessment.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-orange-200 bg-orange-50/10">
        <CardContent className="pt-6">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">⚠️ Important Disclaimer:</p>
            <p>
              This assessment is for informational purposes only and should not replace professional medical advice. 
              Please consult with a qualified mental health professional for proper diagnosis and treatment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 