import { z } from "astro:content";

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date(),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: z.string().optional(),
    description: z.string(),
  })
  .strict();

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
    })
    .optional(),
  liveLink: z.string().optional(),
  github: z.string(),
  draft: z.boolean(),
  tags: z.array(z.string()).optional(),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;

export type ProjectFrontmatter = z.infer<typeof projectSchema>;
