import { defineCollection } from "astro:content";
import { blogSchema, projectSchema } from "./_schemas";

const blog = defineCollection({
  schema: blogSchema,
});

const projects = defineCollection({
  schema: projectSchema,
});

export const collections = { blog, projects };
