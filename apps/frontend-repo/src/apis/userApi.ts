import { auth } from "@/config/firebaseConfig";
import { type User, userSchema } from "@repo/shared";
import { mainApi } from "./index";

export type HttpResponse<TData> = {
	success: boolean;
	data: TData;
};

export const userApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		initUserData: builder.mutation<HttpResponse<User>, void>({
			query: () => ({
				url: "/init-user-data",
				method: "POST",
			}),
		}),
		// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
		fetchUserData: builder.query<User, string | void>({
			query: (userId = auth.currentUser?.uid) => ({
				url: `/fetch-user-data/${userId}`,
			}),
			transformResponse: (response: HttpResponse<User>) =>
				userSchema.parse(response.data),
		}),
		updateUserData: builder.mutation<User, Pick<User, "name" | "dateOfBirth">>({
			query: (user) => ({
				url: `/update-user-data/${auth.currentUser?.uid}`,
				method: "PUT",
				body: user,
			}),
			transformResponse: (response: HttpResponse<User>) =>
				userSchema.parse(response.data),
		}),
	}),
});

export const {
	useFetchUserDataQuery,
	useInitUserDataMutation,
	useUpdateUserDataMutation,
} = userApi;
