import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Crown, Eye } from "lucide-react";
import { useState } from "react";
import { TemplatePreview } from "../components/TemplatePreview";

export function TemplatesPage() {
  const templates = useQuery(api.templates.getTemplates) || [];
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Templates</h1>
        <p className="text-gray-600">Choose from our collection of professional resume templates</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    {template.isPremium && (
                      <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {template.category}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-600">Color Scheme:</span>
                  <div className="flex space-x-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: template.config.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: template.config.colors.secondary }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Font:</span> {template.config.fonts.heading}
                </p>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => setPreviewTemplate(template)}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <Link
                  to={`/builder?template=${template._id}`}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium"
                >
                  Use Template
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates available</h3>
          <p className="text-gray-600">Templates will be loaded automatically</p>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}
