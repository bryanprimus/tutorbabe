import { auth } from "@/config/firebaseConfig";
import { env } from "@/env";
import {
	createApi,
	fakeBaseQuery,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const sdkApi = createApi({
	reducerPath: "sdkApi",
	baseQuery: fakeBaseQuery(),
	endpoints: () => ({}),
});

export const mainApi = createApi({
	reducerPath: "mainApi",
	baseQuery: fetchBaseQuery({
		baseUrl: env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
		prepareHeaders: async (headers) => {
			const currentUser = auth.currentUser;
			if (currentUser) {
				const token = await currentUser.getIdToken();
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
});
