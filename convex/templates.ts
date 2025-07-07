import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getTemplates = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("templates").collect();
  },
});

export const getTemplate = query({
  args: { templateId: v.id("templates") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.templateId);
  },
});

export const seedTemplates = mutation({
  args: {},
  handler: async (ctx) => {
    const existingTemplates = await ctx.db.query("templates").collect();
    if (existingTemplates.length > 0) {
      return;
    }

    const templates = [
      {
        name: "Modern Professional",
        description: "Clean and modern design perfect for tech professionals",
        category: "Professional",
        config: {
          colors: {
            primary: "#2563eb",
            secondary: "#64748b",
            text: "#1e293b",
            background: "#ffffff",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
          },
          layout: "modern",
        },
        isPremium: false,
      },
      {
        name: "Creative Designer",
        description: "Bold and creative template for designers and artists",
        category: "Creative",
        config: {
          colors: {
            primary: "#7c3aed",
            secondary: "#a855f7",
            text: "#1f2937",
            background: "#ffffff",
          },
          fonts: {
            heading: "Poppins",
            body: "Inter",
          },
          layout: "creative",
        },
        isPremium: false,
      },
      {
        name: "Executive",
        description: "Sophisticated template for senior executives",
        category: "Executive",
        config: {
          colors: {
            primary: "#1f2937",
            secondary: "#6b7280",
            text: "#111827",
            background: "#ffffff",
          },
          fonts: {
            heading: "Playfair Display",
            body: "Inter",
          },
          layout: "executive",
        },
        isPremium: true,
      },
      {
        name: "Minimalist",
        description: "Simple and clean design focusing on content",
        category: "Minimalist",
        config: {
          colors: {
            primary: "#059669",
            secondary: "#6b7280",
            text: "#374151",
            background: "#ffffff",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
          },
          layout: "minimalist",
        },
        isPremium: false,
      },
    ];

    for (const template of templates) {
      await ctx.db.insert("templates", template);
    }
  },
});
