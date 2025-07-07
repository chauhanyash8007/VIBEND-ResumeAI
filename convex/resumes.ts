import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserResumes = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("resumes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getResume = query({
  args: { resumeId: v.id("resumes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resume = await ctx.db.get(args.resumeId);
    if (!resume || resume.userId !== userId) {
      throw new Error("Resume not found or access denied");
    }

    return resume;
  },
});

export const createResume = mutation({
  args: {
    title: v.string(),
    templateId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resumeId = await ctx.db.insert("resumes", {
      userId,
      title: args.title,
      templateId: args.templateId,
      personalInfo: {
        fullName: "",
        email: "",
        phone: "",
        location: "",
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      languages: [],
      isPublic: false,
      lastModified: Date.now(),
    });

    return resumeId;
  },
});

export const updateResume = mutation({
  args: {
    resumeId: v.id("resumes"),
    updates: v.object({
      title: v.optional(v.string()),
      personalInfo: v.optional(v.object({
        fullName: v.string(),
        email: v.string(),
        phone: v.string(),
        location: v.string(),
        website: v.optional(v.string()),
        linkedin: v.optional(v.string()),
        github: v.optional(v.string()),
        summary: v.optional(v.string()),
      })),
      experience: v.optional(v.array(v.object({
        id: v.string(),
        company: v.string(),
        position: v.string(),
        location: v.string(),
        startDate: v.string(),
        endDate: v.optional(v.string()),
        current: v.boolean(),
        description: v.string(),
      }))),
      education: v.optional(v.array(v.object({
        id: v.string(),
        institution: v.string(),
        degree: v.string(),
        field: v.string(),
        location: v.string(),
        startDate: v.string(),
        endDate: v.optional(v.string()),
        gpa: v.optional(v.string()),
      }))),
      skills: v.optional(v.array(v.object({
        id: v.string(),
        category: v.string(),
        items: v.array(v.string()),
      }))),
      projects: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        description: v.string(),
        technologies: v.array(v.string()),
        link: v.optional(v.string()),
        github: v.optional(v.string()),
      }))),
      certifications: v.optional(v.array(v.object({
        id: v.string(),
        name: v.string(),
        issuer: v.string(),
        date: v.string(),
        link: v.optional(v.string()),
      }))),
      languages: v.optional(v.array(v.object({
        id: v.string(),
        language: v.string(),
        proficiency: v.string(),
      }))),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resume = await ctx.db.get(args.resumeId);
    if (!resume || resume.userId !== userId) {
      throw new Error("Resume not found or access denied");
    }

    await ctx.db.patch(args.resumeId, {
      ...args.updates,
      lastModified: Date.now(),
    });
  },
});

export const deleteResume = mutation({
  args: { resumeId: v.id("resumes") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const resume = await ctx.db.get(args.resumeId);
    if (!resume || resume.userId !== userId) {
      throw new Error("Resume not found or access denied");
    }

    await ctx.db.delete(args.resumeId);
  },
});
