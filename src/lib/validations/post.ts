import * as z from "zod";

export const postPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  content: z.any().optional(),
});

export const postCreateSchema = z.object({
  title: z.string(),

  content: z.any().optional(),
});
