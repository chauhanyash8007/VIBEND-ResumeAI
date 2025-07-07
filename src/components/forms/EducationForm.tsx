import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { VoiceInput } from "../VoiceInput";

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

interface EducationFormProps {
  data: Education[];
  onSave: (data: Education[]) => void;
  isVoiceEnabled: boolean;
}

export function EducationForm({ data, onSave, isVoiceEnabled }: EducationFormProps) {
  const [education, setEducation] = useState(data);

  useEffect(() => {
    setEducation(data);
  }, [data]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    const updated = [...education, newEducation];
    setEducation(updated);
    onSave(updated);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    onSave(updated);
  };

  const removeEducation = (id: string) => {
    const updated = education.filter(edu => edu.id !== id);
    setEducation(updated);
    onSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Education</h2>
          <p className="text-gray-600">Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <button
            onClick={addEducation}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Education #{index + 1}
                </h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={edu.institution}
                      onChange={(value) => updateEducation(edu.id, "institution", value)}
                      placeholder="e.g., Stanford University"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                      placeholder="e.g., Stanford University"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={edu.degree}
                      onChange={(value) => updateEducation(edu.id, "degree", value)}
                      placeholder="e.g., Bachelor of Science"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      placeholder="e.g., Bachelor of Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={edu.field}
                      onChange={(value) => updateEducation(edu.id, "field", value)}
                      placeholder="e.g., Computer Science"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                      placeholder="e.g., Computer Science"
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
                      value={edu.location}
                      onChange={(value) => updateEducation(edu.id, "location", value)}
                      placeholder="e.g., Stanford, CA"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                      placeholder="e.g., Stanford, CA"
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
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={edu.endDate || ""}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA (Optional)
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={edu.gpa || ""}
                      onChange={(value) => updateEducation(edu.id, "gpa", value)}
                      placeholder="e.g., 3.8/4.0"
                    />
                  ) : (
                    <input
                      type="text"
                      value={edu.gpa || ""}
                      onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                      placeholder="e.g., 3.8/4.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
