import * as z from "zod";

export const courseCreateSchema = z.object({
  title: z.string(),
});

export const coursePatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
  imageId: z.string().optional(),
});
