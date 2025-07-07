import { useState, useEffect } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { VoiceInput } from "../VoiceInput";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onSave: (data: Experience[]) => void;
  isVoiceEnabled: boolean;
}

export function ExperienceForm({ data, onSave, isVoiceEnabled }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState(data);
  const [improvingId, setImprovingId] = useState<string | null>(null);
  const improveDescription = useAction(api.ai.improveDescription);

  useEffect(() => {
    setExperiences(data);
  }, [data]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    const updated = [...experiences, newExperience];
    setExperiences(updated);
    onSave(updated);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const updated = experiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
    onSave(updated);
  };

  const removeExperience = (id: string) => {
    const updated = experiences.filter(exp => exp.id !== id);
    setExperiences(updated);
    onSave(updated);
  };

  const handleImproveDescription = async (id: string) => {
    const experience = experiences.find(exp => exp.id === id);
    if (!experience || !experience.description.trim()) return;

    setImprovingId(id);
    try {
      const improved = await improveDescription({
        description: experience.description,
        jobTitle: experience.position,
      });
      updateExperience(id, "description", improved);
    } catch (error) {
      console.error("Failed to improve description:", error);
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
          <p className="text-gray-600">Add your professional experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <button
            onClick={addExperience}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Experience #{index + 1}
                </h3>
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={experience.position}
                      onChange={(value) => updateExperience(experience.id, "position", value)}
                      placeholder="e.g., Software Engineer"
                    />
                  ) : (
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={experience.company}
                      onChange={(value) => updateExperience(experience.id, "company", value)}
                      placeholder="e.g., Google"
                    />
                  ) : (
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                      placeholder="e.g., Google"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={experience.location}
                      onChange={(value) => updateExperience(experience.id, "location", value)}
                      placeholder="e.g., San Francisco, CA"
                    />
                  ) : (
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onChange={(e) => updateExperience(experience.id, "current", e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${experience.id}`} className="text-sm text-gray-700">
                      I currently work here
                    </label>
                  </div>
                  {!experience.current && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={experience.endDate || ""}
                        onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description *
                  </label>
                  <button
                    onClick={() => handleImproveDescription(experience.id)}
                    disabled={improvingId === experience.id || !experience.description.trim()}
                    className="flex items-center px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4 mr-1" />
                    {improvingId === experience.id ? "Improving..." : "AI Improve"}
                  </button>
                </div>
                {isVoiceEnabled ? (
                  <VoiceInput
                    value={experience.description}
                    onChange={(value) => updateExperience(experience.id, "description", value)}
                    placeholder="Describe your responsibilities and achievements..."
                    multiline
                  />
                ) : (
                  <textarea
                    value={experience.description}
                    onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements. Use bullet points and quantify results where possible."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
