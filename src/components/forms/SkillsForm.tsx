import { useState, useEffect } from "react";
import { Plus, Trash2, X, Sparkles } from "lucide-react";
import { VoiceInput } from "../VoiceInput";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface Skill {
  id: string;
  category: string;
  items: string[];
}

interface SkillsFormProps {
  data: Skill[];
  onSave: (data: Skill[]) => void;
  isVoiceEnabled: boolean;
}

export function SkillsForm({ data, onSave, isVoiceEnabled }: SkillsFormProps) {
  const [skills, setSkills] = useState(data);
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({});
  const [isSuggesting, setIsSuggesting] = useState(false);
  const suggestSkills = useAction(api.ai.suggestSkills);

  useEffect(() => {
    setSkills(data);
  }, [data]);

  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: "",
      items: [],
    };
    const updated = [...skills, newSkill];
    setSkills(updated);
    onSave(updated);
  };

  const updateSkillCategory = (id: string, category: string) => {
    const updated = skills.map(skill =>
      skill.id === id ? { ...skill, category } : skill
    );
    setSkills(updated);
    onSave(updated);
  };

  const removeSkillCategory = (id: string) => {
    const updated = skills.filter(skill => skill.id !== id);
    setSkills(updated);
    onSave(updated);
  };

  const addSkillItem = (categoryId: string) => {
    const skillText = newSkillInputs[categoryId]?.trim();
    if (!skillText) return;

    const updated = skills.map(skill =>
      skill.id === categoryId
        ? { ...skill, items: [...skill.items, skillText] }
        : skill
    );
    setSkills(updated);
    onSave(updated);
    setNewSkillInputs({ ...newSkillInputs, [categoryId]: "" });
  };

  const removeSkillItem = (categoryId: string, itemIndex: number) => {
    const updated = skills.map(skill =>
      skill.id === categoryId
        ? { ...skill, items: skill.items.filter((_, index) => index !== itemIndex) }
        : skill
    );
    setSkills(updated);
    onSave(updated);
  };

  const handleSuggestSkills = async () => {
    setIsSuggesting(true);
    try {
      const suggestions = await suggestSkills({
        jobTitle: "Software Engineer",
        industry: "Technology",
      });
      
      if (suggestions.length > 0) {
        const newSkill: Skill = {
          id: Date.now().toString(),
          category: "Suggested Skills",
          items: suggestions,
        };
        const updated = [...skills, newSkill];
        setSkills(updated);
        onSave(updated);
      }
    } catch (error) {
      console.error("Failed to suggest skills:", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills</h2>
          <p className="text-gray-600">Add your technical and soft skills</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleSuggestSkills}
            disabled={isSuggesting}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isSuggesting ? "Suggesting..." : "AI Suggest"}
          </button>
          <button
            onClick={addSkillCategory}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No skills added yet</p>
          <button
            onClick={addSkillCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Skill Category
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Skill Category #{index + 1}
                </h3>
                <button
                  onClick={() => removeSkillCategory(skill.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                {isVoiceEnabled ? (
                  <VoiceInput
                    value={skill.category}
                    onChange={(value) => updateSkillCategory(skill.id, value)}
                    placeholder="e.g., Programming Languages, Tools, Soft Skills"
                  />
                ) : (
                  <input
                    type="text"
                    value={skill.category}
                    onChange={(e) => updateSkillCategory(skill.id, e.target.value)}
                    placeholder="e.g., Programming Languages, Tools, Soft Skills"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                
                {skill.items.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skill.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {item}
                        <button
                          onClick={() => removeSkillItem(skill.id, itemIndex)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex space-x-2">
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={newSkillInputs[skill.id] || ""}
                      onChange={(value) => setNewSkillInputs({ ...newSkillInputs, [skill.id]: value })}
                      placeholder="Add a skill..."
                    />
                  ) : (
                    <input
                      type="text"
                      value={newSkillInputs[skill.id] || ""}
                      onChange={(e) => setNewSkillInputs({ ...newSkillInputs, [skill.id]: e.target.value })}
                      placeholder="Add a skill..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addSkillItem(skill.id)}
                    />
                  )}
                  <button
                    onClick={() => addSkillItem(skill.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
