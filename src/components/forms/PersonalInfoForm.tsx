import { useState, useEffect } from "react";
import { VoiceInput } from "../VoiceInput";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Sparkles } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onSave: (data: PersonalInfo) => void;
  isVoiceEnabled: boolean;
}

export function PersonalInfoForm({ data, onSave, isVoiceEnabled }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState(data);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const generateSummary = useAction(api.ai.generateSummary);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onSave(updated);
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summary = await generateSummary({
        experience: [],
        skills: [],
      });
      handleChange("summary", summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.fullName}
              onChange={(value) => handleChange("fullName", value)}
              placeholder="Enter your full name"
            />
          ) : (
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              placeholder="Enter your email"
            />
          ) : (
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="Enter your phone number"
            />
          ) : (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.location}
              onChange={(value) => handleChange("location", value)}
              placeholder="City, State"
            />
          ) : (
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, State"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.website || ""}
              onChange={(value) => handleChange("website", value)}
              placeholder="https://yourwebsite.com"
            />
          ) : (
            <input
              type="url"
              value={formData.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn
          </label>
          {isVoiceEnabled ? (
            <VoiceInput
              value={formData.linkedin || ""}
              onChange={(value) => handleChange("linkedin", value)}
              placeholder="https://linkedin.com/in/username"
            />
          ) : (
            <input
              type="url"
              value={formData.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <button
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            {isGeneratingSummary ? "Generating..." : "AI Generate"}
          </button>
        </div>
        {isVoiceEnabled ? (
          <VoiceInput
            value={formData.summary || ""}
            onChange={(value) => handleChange("summary", value)}
            placeholder="Brief professional summary..."
            multiline
          />
        ) : (
          <textarea
            value={formData.summary || ""}
            onChange={(e) => handleChange("summary", e.target.value)}
            placeholder="Brief professional summary highlighting your key strengths and career objectives..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        )}
      </div>
    </div>
  );
}
