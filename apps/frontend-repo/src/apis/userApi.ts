import { auth } from "@/config/firebaseConfig";
import { z } from "zod";
import { mainApi } from "./index";

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

type User = z.infer<typeof UserSchema>;

export const userApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
		fetchUserData: builder.query<User, string | void>({
			query: (userId = auth.currentUser?.uid) => ({
				url: `/users/fetch-user-data${userId ? `/${userId}` : ""}`,
			}),
		}),
	}),
});

export const { useFetchUserDataQuery } = userApi;
