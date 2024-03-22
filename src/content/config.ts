// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const exhibitionCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      publicationDate: z.date(),
      author: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string()
      }),
      description: z.string(),
      category: z.array(z.string()),
      dependecies: z.array(z.string()),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: exhibitionCollection,
};