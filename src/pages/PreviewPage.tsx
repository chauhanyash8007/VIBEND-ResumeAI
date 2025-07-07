import { useParams, Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ResumePreview } from "../components/ResumePreview";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import html2pdf from "html2pdf.js";

export function PreviewPage() {
  const { resumeId } = useParams();
  const resume = useQuery(
    api.resumes.getResume,
    resumeId ? { resumeId: resumeId as any } : "skip"
  );

  const handleDownload = () => {
    const resumeElement = document.getElementById("resume");
    if (!resumeElement) return;

    const opt = {
      margin: 0.5,
      filename: `${resume?.title || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(resumeElement).save();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resume?.title || "My Resume",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {resume.title}
                </h1>
                <p className="text-sm text-gray-600">Resume Preview</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
              <Link
                to={`/builder/${resumeId}`}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Edit Resume
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div id="resume">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </div>
  );
}
