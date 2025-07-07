import { Doc } from "../../convex/_generated/dataModel";

interface ResumePreviewProps {
  resume: Doc<"resumes">;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resume.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            {resume.personalInfo.email && (
              <span>{resume.personalInfo.email}</span>
            )}
            {resume.personalInfo.phone && (
              <span>{resume.personalInfo.phone}</span>
            )}
            {resume.personalInfo.location && (
              <span>{resume.personalInfo.location}</span>
            )}
          </div>
          {(resume.personalInfo.website || resume.personalInfo.linkedin || resume.personalInfo.github) && (
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-blue-600">
              {resume.personalInfo.website && (
                <a href={resume.personalInfo.website} className="hover:underline">
                  Website
                </a>
              )}
              {resume.personalInfo.linkedin && (
                <a href={resume.personalInfo.linkedin} className="hover:underline">
                  LinkedIn
                </a>
              )}
              {resume.personalInfo.github && (
                <a href={resume.personalInfo.github} className="hover:underline">
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p>{exp.location}</p>
                      <p className="text-sm">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <p className="text-gray-600">{edu.field}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{edu.location}</p>
                    <p className="text-sm">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Skills
            </h2>
            <div className="space-y-3">
              {resume.skills.map((skillCategory) => (
                <div key={skillCategory.id}>
                  <h3 className="font-semibold text-gray-900 mb-2">{skillCategory.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Projects
            </h2>
            <div className="space-y-6">
              {resume.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <div className="flex space-x-2">
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Certifications
            </h2>
            <div className="space-y-3">
              {resume.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-blue-600">{cert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">{cert.date}</p>
                    {cert.link && (
                      <a href={cert.link} className="text-blue-600 hover:underline text-sm">
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {resume.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-1">
              Languages
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {resume.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium text-gray-900">{lang.language}</span>
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
