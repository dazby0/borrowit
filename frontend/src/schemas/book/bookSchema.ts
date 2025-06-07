import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(2).max(150),
  author: z.string().min(2).max(100),
  year: z.coerce.number().min(0).max(2100),
  description: z.string().max(1000).optional(),
});

export type BookFormData = z.infer<typeof bookSchema>;
