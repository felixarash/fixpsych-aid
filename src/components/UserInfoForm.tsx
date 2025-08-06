"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/data/assessment";

interface UserInfoFormProps {
  onComplete: (userInfo: UserInfo) => void;
}

export function UserInfoForm({ onComplete }: UserInfoFormProps) {
  const [formData, setFormData] = useState<Partial<UserInfo>>({
    name: "",
    age: 0,
    gender: "",
    occupation: "",
    contactInfo: "",
    emergencyContact: "",
    medicalHistory: "",
    currentMedications: "",
    assessmentDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.gender) {
      onComplete(formData as UserInfo);
    }
  };

  const handleChange = (field: keyof UserInfo, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Patient Information
        </CardTitle>
        <CardDescription className="text-center">
          Please provide your basic information to begin the psychological assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Age *</label>
              <Input
                required
                type="number"
                min="1"
                max="120"
                value={formData.age || ""}
                onChange={(e) => handleChange("age", parseInt(e.target.value) || 0)}
                placeholder="Enter your age"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gender *</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Occupation</label>
              <Input
                value={formData.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
                placeholder="Enter your occupation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contact Information</label>
              <Input
                value={formData.contactInfo}
                onChange={(e) => handleChange("contactInfo", e.target.value)}
                placeholder="Phone number or email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Emergency Contact</label>
              <Input
                value={formData.emergencyContact}
                onChange={(e) => handleChange("emergencyContact", e.target.value)}
                placeholder="Emergency contact details"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Medical History</label>
            <Textarea
              value={formData.medicalHistory}
              onChange={(e) => handleChange("medicalHistory", e.target.value)}
              placeholder="Please describe any relevant medical history, previous diagnoses, or mental health conditions"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Medications</label>
            <Textarea
              value={formData.currentMedications}
              onChange={(e) => handleChange("currentMedications", e.target.value)}
              placeholder="List any current medications, including dosage and frequency"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Assessment Date</label>
            <Input
              type="date"
              value={formData.assessmentDate}
              onChange={(e) => handleChange("assessmentDate", e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Continue to Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 