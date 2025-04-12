import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { sdkApi } from "./index";

export const userApi = sdkApi.injectEndpoints({
	endpoints: (builder) => ({
		signInWithGoogle: builder.mutation({
			queryFn: async () => {
				try {
					const provider = new GoogleAuthProvider();
					return { data: signInWithPopup(auth, provider) };
				} catch (err) {
					// TODO: Handle error globally
					// Use neverthrow ?
					return { error: err };
				}
			},
		}),
	}),
});

export const { useSignInWithGoogleMutation } = userApi;
