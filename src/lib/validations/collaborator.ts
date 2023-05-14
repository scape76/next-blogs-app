import * as z from "zod";

export const collaboratorAddSchema = z.object({
  collaboratorEmail: z.string().email(),
});

// TODO : make it an array of actions type

export const collaboratorPutSchema = z.object({
  permissions: z.any(),
});
