import { z } from "zod";

// TODO: Move to shared packages
export const UserSchema = z.object({
	id: z.string(),
	displayName: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	photoURL: z.string().nullable().optional(),
	phoneNumber: z.string().nullable().optional(),
	totalAverageWeightRatings: z.number().optional(),
	numberOfRents: z.number().optional(),
	recentlyActive: z.number().optional(), // epoch time
});

export type User = z.infer<typeof UserSchema>;
