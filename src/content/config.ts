import { defineCollection, z } from "astro:content";


function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string().max(60).min(10),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    description: z.string().max(200).min(50),
    featured: z.boolean().optional(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
  }),
});

export const collections = {
  blog: blogCollection,
};
