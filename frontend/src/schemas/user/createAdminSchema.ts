import { z } from "zod";

export const createAdminSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateAdminFormValues = z.infer<typeof createAdminSchema>;
