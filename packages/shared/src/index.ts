import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	photoURL: z.string(),
	createdAt: z.any(),
	updatedAt: z.any(),
	dateOfBirth: z.string().optional(),
	totalAverageWeightRatings: z.number().optional(),
	numberOfRents: z.number().optional(),
	recentlyActive: z.number().optional(),
});

export type User = z.infer<typeof userSchema>;

export * from "./tryCatch.js";
