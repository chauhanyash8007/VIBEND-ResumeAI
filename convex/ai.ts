import { action } from "./_generated/server";
import { v } from "convex/values";

export const generateSummary = action({
  args: {
    experience: v.array(v.object({
      company: v.string(),
      position: v.string(),
      description: v.string(),
    })),
    skills: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const prompt = `Based on the following work experience and skills, generate a professional summary for a resume:

Experience:
${args.experience.map(exp => `- ${exp.position} at ${exp.company}: ${exp.description}`).join('\n')}

Skills: ${args.skills.join(', ')}

Generate a concise, professional summary (2-3 sentences) that highlights key strengths and career focus.`;

    try {
      const response = await fetch(`${process.env.CONVEX_OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CONVEX_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI generation failed:', error);
      return "Experienced professional with a strong background in technology and proven track record of delivering results.";
    }
  },
});

export const improveDescription = action({
  args: {
    description: v.string(),
    jobTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const prompt = `Improve this job description for a ${args.jobTitle} position. Make it more professional, action-oriented, and quantifiable where possible:

Original: ${args.description}

Return only the improved description, focusing on achievements and impact.`;

    try {
      const response = await fetch(`${process.env.CONVEX_OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CONVEX_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('AI improvement failed:', error);
      return args.description;
    }
  },
});

export const suggestSkills = action({
  args: {
    jobTitle: v.string(),
    industry: v.string(),
  },
  handler: async (ctx, args) => {
    const prompt = `Suggest 8-12 relevant technical and soft skills for a ${args.jobTitle} in the ${args.industry} industry. Return as a comma-separated list.`;

    try {
      const response = await fetch(`${process.env.CONVEX_OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CONVEX_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content.trim().split(',').map((skill: string) => skill.trim());
    } catch (error) {
      console.error('AI skill suggestion failed:', error);
      return [];
    }
  },
});
