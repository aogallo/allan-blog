import { defineCollection } from "astro:content";
import { blogSchema, projectSchema } from "./_schemas";

const blog = defineCollection({
  type: "content",
  schema: blogSchema,
});

const projects = defineCollection({
  type: "content",
  schema: projectSchema,
});

export const collections = { blog, projects };
