import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  resumes: defineTable({
    userId: v.id("users"),
    title: v.string(),
    templateId: v.string(),
    personalInfo: v.object({
      fullName: v.string(),
      email: v.string(),
      phone: v.string(),
      location: v.string(),
      website: v.optional(v.string()),
      linkedin: v.optional(v.string()),
      github: v.optional(v.string()),
      summary: v.optional(v.string()),
    }),
    experience: v.array(v.object({
      id: v.string(),
      company: v.string(),
      position: v.string(),
      location: v.string(),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      current: v.boolean(),
      description: v.string(),
    })),
    education: v.array(v.object({
      id: v.string(),
      institution: v.string(),
      degree: v.string(),
      field: v.string(),
      location: v.string(),
      startDate: v.string(),
      endDate: v.optional(v.string()),
      gpa: v.optional(v.string()),
    })),
    skills: v.array(v.object({
      id: v.string(),
      category: v.string(),
      items: v.array(v.string()),
    })),
    projects: v.array(v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      technologies: v.array(v.string()),
      link: v.optional(v.string()),
      github: v.optional(v.string()),
    })),
    certifications: v.array(v.object({
      id: v.string(),
      name: v.string(),
      issuer: v.string(),
      date: v.string(),
      link: v.optional(v.string()),
    })),
    languages: v.array(v.object({
      id: v.string(),
      language: v.string(),
      proficiency: v.string(),
    })),
    isPublic: v.boolean(),
    lastModified: v.number(),
  }).index("by_user", ["userId"]),

  templates: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(),
    previewImage: v.optional(v.id("_storage")),
    config: v.object({
      colors: v.object({
        primary: v.string(),
        secondary: v.string(),
        text: v.string(),
        background: v.string(),
      }),
      fonts: v.object({
        heading: v.string(),
        body: v.string(),
      }),
      layout: v.string(),
    }),
    isPremium: v.boolean(),
  }),

  userProfiles: defineTable({
    userId: v.id("users"),
    preferences: v.object({
      defaultTemplate: v.optional(v.string()),
      voiceEnabled: v.boolean(),
      language: v.string(),
    }),
    subscription: v.object({
      plan: v.string(),
      expiresAt: v.optional(v.number()),
    }),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
