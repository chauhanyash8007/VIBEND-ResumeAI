import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Plus, FileText, Calendar, Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DashboardPage() {
  const resumes = useQuery(api.resumes.getUserResumes) || [];
  const templates = useQuery(api.templates.getTemplates) || [];
  const createResume = useMutation(api.resumes.createResume);
  const deleteResume = useMutation(api.resumes.deleteResume);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim() || !selectedTemplate) {
      toast.error("Please enter a title and select a template");
      return;
    }

    try {
      const resumeId = await createResume({
        title: newResumeTitle,
        templateId: selectedTemplate,
      });
      
      toast.success("Resume created successfully!");
      setShowCreateModal(false);
      setNewResumeTitle("");
      setSelectedTemplate("");
      
      // Navigate to builder
      window.location.href = `/builder/${resumeId}`;
    } catch (error) {
      toast.error("Failed to create resume");
    }
  };

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;
    
    try {
      await deleteResume({ resumeId: resumeId as any });
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-2">Manage and create your professional resumes</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Resume
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
              <p className="text-gray-600">Total Resumes</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {resumes.filter(r => Date.now() - r.lastModified < 7 * 24 * 60 * 60 * 1000).length}
              </p>
              <p className="text-gray-600">Recent Updates</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {templates.filter(t => !t.isPremium).length}
              </p>
              <p className="text-gray-600">Free Templates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumes Grid */}
      {resumes.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-600 mb-6">Create your first resume to get started</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Resume
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{resume.title}</h3>
                    <p className="text-sm text-gray-600">
                      Updated {new Date(resume.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/preview/${resume._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/builder/${resume._id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Name:</span> {resume.personalInfo.fullName || "Not set"}</p>
                    <p><span className="font-medium">Email:</span> {resume.personalInfo.email || "Not set"}</p>
                    <p><span className="font-medium">Experience:</span> {resume.experience.length} entries</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/builder/${resume._id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                  >
                    Edit Resume
                  </Link>
                  <Link
                    to={`/preview/${resume._id}`}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-center text-sm font-medium"
                  >
                    Preview
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Resume Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Create New Resume</h2>
              <p className="text-gray-600 mt-1">Choose a template and give your resume a name</p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume Title
                </label>
                <input
                  type="text"
                  value={newResumeTitle}
                  onChange={(e) => setNewResumeTitle(e.target.value)}
                  placeholder="e.g., Software Engineer Resume"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Choose Template
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template._id}
                      onClick={() => setSelectedTemplate(template._id)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedTemplate === template._id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{template.name}</h3>
                        {template.isPremium && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="mt-3 flex items-center space-x-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: template.config.colors.primary }}
                        />
                        <span className="text-xs text-gray-500">{template.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateResume}
                disabled={!newResumeTitle.trim() || !selectedTemplate}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
