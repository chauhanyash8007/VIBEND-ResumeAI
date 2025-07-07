import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { ResumeBuilderPage } from "./pages/ResumeBuilderPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { PreviewPage } from "./pages/PreviewPage";
import { Navbar } from "./components/Navbar";
import { useEffect } from "react";
import { useMutation } from "convex/react";

export default function App() {
  const seedTemplates = useMutation(api.templates.seedTemplates);

  useEffect(() => {
    seedTemplates();
  }, [seedTemplates]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />

        <Unauthenticated>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Unauthenticated>

        <Authenticated>
          <Navbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/builder/:resumeId?" element={<ResumeBuilderPage />} />
            <Route path="/preview/:resumeId" element={<PreviewPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Authenticated>
      </div>
    </Router>
  );
}

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue building your resume
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
