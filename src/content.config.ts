// Import the glob loader
import { glob } from "astro/loaders";

// Import utilities from `astro:content`
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const tutorial = defineCollection({
    loader: glob({
        base: "./src/content/tutorial",
        pattern: "**/[^_]*.md"
    }),
    schema: z.object({
        title: z.string(),
    })
});

// Export a single `collections` object to register your collection(s)
export const collections = { tutorial };
