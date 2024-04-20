// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const exhibitionCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      folderName: z.string(),
      publicationDate: z.date(),
      author: z.string(),
      imageSrc: image().refine((img) => img.width === 360, {
        message: "Cover image must be exactly 360 pixels wide!",
      }),
      description: z.string(),
      category: z.array(z.string()),
      dependencies: z.array(z.string()),
    }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  works: exhibitionCollection,
};
