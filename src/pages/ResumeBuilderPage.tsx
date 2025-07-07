import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { PersonalInfoForm } from "../components/forms/PersonalInfoForm";
import { ExperienceForm } from "../components/forms/ExperienceForm";
import { EducationForm } from "../components/forms/EducationForm";
import { SkillsForm } from "../components/forms/SkillsForm";
import { ProjectsForm } from "../components/forms/ProjectsForm";
import { ResumePreview } from "../components/ResumePreview";
import { VoiceAssistant } from "../components/VoiceAssistant";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  Save,
  Eye,
  Mic,
  MicOff
} from "lucide-react";

const sections = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: FolderOpen },
];

export function ResumeBuilderPage() {
  const { resumeId } = useParams();
  const resume = useQuery(api.resumes.getResume, resumeId ? { resumeId: resumeId as any } : "skip");
  const updateResume = useMutation(api.resumes.updateResume);
  
  const [activeSection, setActiveSection] = useState("personal");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedSave = useCallback(async (updates: any) => {
    if (!resumeId) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for debounced save
    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateResume({
          resumeId: resumeId as any,
          updates,
        });
        // Silent auto-save - no toast notification
      } catch (error) {
        toast.error("Failed to save resume");
      } finally {
        setIsSaving(false);
      }
    }, 1000); // 1 second debounce
  }, [resumeId, updateResume]);

  const handleSave = (updates: any) => {
    debouncedSave(updates);
  };

  const handleManualSave = async () => {
    if (!resumeId) return;
    
    // Clear debounced save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    try {
      // Force immediate save
      await updateResume({
        resumeId: resumeId as any,
        updates: {},
      });
      toast.success("Resume saved successfully!");
    } catch (error) {
      toast.error("Failed to save resume");
    } finally {
      setIsSaving(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">{resume.title}</h1>
          <p className="text-sm text-gray-600 mt-1">Resume Builder</p>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="p-4 border-t space-y-3">
          <button
            onClick={handleManualSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? "Saving..." : "Save Resume"}
          </button>

          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
              isVoiceEnabled
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isVoiceEnabled ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Disable Voice
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Enable Voice
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Form Section */}
        <div className={`${showPreview ? "w-1/2" : "w-full"} overflow-y-auto`}>
          <div className="p-8">
            {activeSection === "personal" && (
              <PersonalInfoForm
                data={resume.personalInfo}
                onSave={(personalInfo) => handleSave({ personalInfo })}
                isVoiceEnabled={isVoiceEnabled}
              />
            )}
            {activeSection === "experience" && (
              <ExperienceForm
                data={resume.experience}
                onSave={(experience) => handleSave({ experience })}
                isVoiceEnabled={isVoiceEnabled}
              />
            )}
            {activeSection === "education" && (
              <EducationForm
                data={resume.education}
                onSave={(education) => handleSave({ education })}
                isVoiceEnabled={isVoiceEnabled}
              />
            )}
            {activeSection === "skills" && (
              <SkillsForm
                data={resume.skills}
                onSave={(skills) => handleSave({ skills })}
                isVoiceEnabled={isVoiceEnabled}
              />
            )}
            {activeSection === "projects" && (
              <ProjectsForm
                data={resume.projects}
                onSave={(projects) => handleSave({ projects })}
                isVoiceEnabled={isVoiceEnabled}
              />
            )}
          </div>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-200 bg-white">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <ResumePreview resume={resume} />
            </div>
          </div>
        )}
      </div>

      {/* Voice Assistant */}
      {isVoiceEnabled && (
        <VoiceAssistant
          activeSection={activeSection}
          onVoiceInput={(text, field) => {
            // Handle voice input based on active section
            console.log("Voice input:", text, "for field:", field);
          }}
        />
      )}
    </div>
  );
}
