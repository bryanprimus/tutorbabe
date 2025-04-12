import { auth } from "@/config/firebaseConfig";
import { setUser } from "@/store/authSlice";
import { GoogleAuthProvider, type UserCredential } from "firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { sdkApi } from "./index";

export const authApi = sdkApi.injectEndpoints({
	endpoints: (builder) => ({
		signInWithGoogle: builder.mutation<Promise<UserCredential>, void>({
			queryFn: () => {
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
		signOut: builder.mutation({
			queryFn: () => {
				try {
					return { data: signOut(auth) };
				} catch (err) {
					// TODO: Handle error globally
					// Use neverthrow ?
					return { error: err };
				}
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setUser(null));
				} catch {
					// TODO: Handle error globally
					// Use neverthrow ?
				}
			},
		}),
	}),
});

export const { useSignInWithGoogleMutation, useSignOutMutation } = authApi;
