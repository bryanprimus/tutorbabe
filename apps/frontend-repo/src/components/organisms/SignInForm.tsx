"use client";
import { useSignInWithGoogleMutation } from "@/apis/authApi";
import { useInitUserDataMutation } from "@/apis/userApi";
import { useRouter } from "next/navigation";
import { GoogleButton } from "../atoms/GoogleButton";

export const SignInForm = () => {
	const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation();
	const [initUserDataMutation] = useInitUserDataMutation();
	const router = useRouter();

	const handleGoogleSignIn = async () => {
		await signInWithGoogle(undefined).unwrap();
		await initUserDataMutation().unwrap();

		router.replace("/profile");
	};
	return <GoogleButton onClick={handleGoogleSignIn} loading={isLoading} />;
};
