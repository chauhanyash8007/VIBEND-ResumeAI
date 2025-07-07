import { Doc } from "../../convex/_generated/dataModel";

interface TemplatePreviewProps {
  template: Doc<"templates">;
  onClose: () => void;
}

export function TemplatePreview({ template, onClose }: TemplatePreviewProps) {
  const sampleResume = {
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      website: "https://johndoe.dev",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      summary: "Experienced software engineer with 5+ years of experience building scalable web applications and leading development teams."
    },
    experience: [
      {
        id: "1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "",
        current: true,
        description: "• Led development of microservices architecture serving 1M+ users\n• Mentored junior developers and improved team productivity by 30%\n• Implemented CI/CD pipelines reducing deployment time by 50%"
      },
      {
        id: "2",
        company: "StartupXYZ",
        position: "Full Stack Developer",
        location: "San Francisco, CA",
        startDate: "2020-06",
        endDate: "2021-12",
        current: false,
        description: "• Built responsive web applications using React and Node.js\n• Collaborated with design team to implement pixel-perfect UIs\n• Optimized database queries improving performance by 40%"
      }
    ],
    education: [
      {
        id: "1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "Berkeley, CA",
        startDate: "2016-08",
        endDate: "2020-05",
        gpa: "3.8/4.0"
      }
    ],
    skills: [
      {
        id: "1",
        category: "Programming Languages",
        items: ["JavaScript", "TypeScript", "Python", "Java", "Go"]
      },
      {
        id: "2",
        category: "Frameworks & Libraries",
        items: ["React", "Node.js", "Express", "Django", "Next.js"]
      },
      {
        id: "3",
        category: "Tools & Technologies",
        items: ["Docker", "AWS", "PostgreSQL", "Redis", "Git"]
      }
    ],
    projects: [
      {
        id: "1",
        name: "E-commerce Platform",
        description: "Full-stack e-commerce application with payment processing, inventory management, and admin dashboard.",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "https://demo-ecommerce.com",
        github: "https://github.com/johndoe/ecommerce"
      },
      {
        id: "2",
        name: "Task Management App",
        description: "Collaborative task management tool with real-time updates and team collaboration features.",
        technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
        link: "https://taskapp.com",
        github: "https://github.com/johndoe/taskapp"
      }
    ],
    certifications: [],
    languages: []
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
            <p className="text-gray-600 mt-1">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div 
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            style={{
              color: template.config.colors.text,
              fontFamily: template.config.fonts.body
            }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8 border-b pb-6">
                <h1 
                  className="text-3xl font-bold mb-2"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  {sampleResume.personalInfo.fullName}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-gray-600">
                  <span>{sampleResume.personalInfo.email}</span>
                  <span>{sampleResume.personalInfo.phone}</span>
                  <span>{sampleResume.personalInfo.location}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <a href="#" style={{ color: template.config.colors.secondary }} className="hover:underline">
                    Website
                  </a>
                  <a href="#" style={{ color: template.config.colors.secondary }} className="hover:underline">
                    LinkedIn
                  </a>
                  <a href="#" style={{ color: template.config.colors.secondary }} className="hover:underline">
                    GitHub
                  </a>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h2 
                  className="text-xl font-bold mb-3 border-b border-gray-200 pb-1"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  Professional Summary
                </h2>
                <p className="leading-relaxed">{sampleResume.personalInfo.summary}</p>
              </div>

              {/* Experience */}
              <div className="mb-8">
                <h2 
                  className="text-xl font-bold mb-4 border-b border-gray-200 pb-1"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {sampleResume.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p style={{ color: template.config.colors.secondary }} className="font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right text-gray-600">
                          <p>{exp.location}</p>
                          <p className="text-sm">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="whitespace-pre-line">{exp.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-8">
                <h2 
                  className="text-xl font-bold mb-4 border-b border-gray-200 pb-1"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  Education
                </h2>
                {sampleResume.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <p style={{ color: template.config.colors.secondary }} className="font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-gray-600">{edu.field}</p>
                      <p className="text-gray-600">GPA: {edu.gpa}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p>{edu.location}</p>
                      <p className="text-sm">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h2 
                  className="text-xl font-bold mb-4 border-b border-gray-200 pb-1"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {sampleResume.skills.map((skillCategory) => (
                    <div key={skillCategory.id}>
                      <h3 className="font-semibold mb-2">{skillCategory.category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.items.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ 
                              backgroundColor: template.config.colors.secondary + '20',
                              color: template.config.colors.secondary 
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 
                  className="text-xl font-bold mb-4 border-b border-gray-200 pb-1"
                  style={{ 
                    color: template.config.colors.primary,
                    fontFamily: template.config.fonts.heading 
                  }}
                >
                  Projects
                </h2>
                <div className="space-y-6">
                  {sampleResume.projects.map((project) => (
                    <div key={project.id}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <div className="flex space-x-2">
                          <a href="#" style={{ color: template.config.colors.secondary }} className="hover:underline text-sm">
                            Live Demo
                          </a>
                          <a href="#" style={{ color: template.config.colors.secondary }} className="hover:underline text-sm">
                            GitHub
                          </a>
                        </div>
                      </div>
                      <p className="mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 rounded text-sm"
                            style={{ 
                              backgroundColor: template.config.colors.primary + '20',
                              color: template.config.colors.primary 
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
