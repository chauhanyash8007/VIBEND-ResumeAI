import { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { VoiceInput } from "../VoiceInput";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

interface ProjectsFormProps {
  data: Project[];
  onSave: (data: Project[]) => void;
  isVoiceEnabled: boolean;
}

export function ProjectsForm({ data, onSave, isVoiceEnabled }: ProjectsFormProps) {
  const [projects, setProjects] = useState(data);
  const [newTechInputs, setNewTechInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
    };
    const updated = [...projects, newProject];
    setProjects(updated);
    onSave(updated);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    const updated = projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    setProjects(updated);
    onSave(updated);
  };

  const removeProject = (id: string) => {
    const updated = projects.filter(project => project.id !== id);
    setProjects(updated);
    onSave(updated);
  };

  const addTechnology = (projectId: string) => {
    const techText = newTechInputs[projectId]?.trim();
    if (!techText) return;

    const updated = projects.map(project =>
      project.id === projectId
        ? { ...project, technologies: [...project.technologies, techText] }
        : project
    );
    setProjects(updated);
    onSave(updated);
    setNewTechInputs({ ...newTechInputs, [projectId]: "" });
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const updated = projects.map(project =>
      project.id === projectId
        ? { ...project, technologies: project.technologies.filter((_, index) => index !== techIndex) }
        : project
    );
    setProjects(updated);
    onSave(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects</h2>
          <p className="text-gray-600">Showcase your best work and projects</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <button
            onClick={addProject}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Project #{index + 1}
                </h3>
                <button
                  onClick={() => removeProject(project.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={project.name}
                      onChange={(value) => updateProject(project.id, "name", value)}
                      placeholder="e.g., E-commerce Website"
                    />
                  ) : (
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="e.g., E-commerce Website"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live Demo URL
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={project.link || ""}
                      onChange={(value) => updateProject(project.id, "link", value)}
                      placeholder="https://example.com"
                    />
                  ) : (
                    <input
                      type="url"
                      value={project.link || ""}
                      onChange={(e) => updateProject(project.id, "link", e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Repository
                  </label>
                  {isVoiceEnabled ? (
                    <VoiceInput
                      value={project.github || ""}
                      onChange={(value) => updateProject(project.id, "github", value)}
                      placeholder="https://github.com/username/repo"
                    />
                  ) : (
                    <input
                      type="url"
                      value={project.github || ""}
                      onChange={(e) => updateProject(project.id, "github", e.target.value)}
                      placeholder="https://github.com/username/repo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description *
                </label>
                {isVoiceEnabled ? (
                  <VoiceInput
                    value={project.description}
                    onChange={(value) => updateProject(project.id, "description", value)}
                    placeholder="Describe what this project does and your role in it..."
                    multiline
                  />
                ) : (
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe what this project does and your role in it..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, techIndex)}
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
                      value={newTechInputs[project.id] || ""}
                      onChange={(value) => setNewTechInputs({ ...newTechInputs, [project.id]: value })}
                      placeholder="Add a technology..."
                    />
                  ) : (
                    <input
                      type="text"
                      value={newTechInputs[project.id] || ""}
                      onChange={(e) => setNewTechInputs({ ...newTechInputs, [project.id]: e.target.value })}
                      placeholder="Add a technology..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology(project.id)}
                    />
                  )}
                  <button
                    onClick={() => addTechnology(project.id)}
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
