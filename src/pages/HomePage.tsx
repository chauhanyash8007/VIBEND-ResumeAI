import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Users, Zap } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VIBEND</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ResumeAI</span>
          </div>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume with
            <span className="text-blue-600 block">AI-Powered Voice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional resumes in minutes using our AI assistant and
            voice commands. Choose from beautiful templates and let AI optimize
            your content for maximum impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 transition-colors font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResumeAI?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create a standout resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Voice Commands
              </h3>
              <p className="text-gray-600">
                Fill out your resume using voice commands. Just speak naturally
                and watch your resume come to life.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Optimization
              </h3>
              <p className="text-gray-600">
                Our AI analyzes your content and suggests improvements to make
                your resume more impactful.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Professional Templates
              </h3>
              <p className="text-gray-600">
                Choose from dozens of professionally designed templates that
                work for any industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Create Resumes 10x Faster
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Traditional resume builders are slow and tedious. With ResumeAI,
                you can create a complete professional resume in under 10
                minutes using voice commands and AI assistance.
              </p>

              <div className="space-y-4">
                {[
                  "Voice-to-text for all form fields",
                  "AI-powered content suggestions",
                  "Real-time grammar and style checking",
                  "One-click formatting and design",
                  "Export to PDF, Word, or share online",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6">
                <h3 className="text-2xl font-bold mb-2">Start Building Now</h3>
                <p className="opacity-90">
                  Join thousands of professionals who've landed their dream jobs
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Free Templates</span>
                  <span className="text-green-600 font-bold">4 Available</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">AI Suggestions</span>
                  <span className="text-green-600 font-bold">Unlimited</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Voice Commands</span>
                  <span className="text-green-600 font-bold">Included</span>
                </div>
              </div>

              <Link
                to="/login"
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg mt-6 flex items-center justify-center"
              >
                Create Your Resume
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VIBEND</span>
            </div>
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <p className="text-gray-400 mb-6">
            Build professional resumes with AI-powered voice commands
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
