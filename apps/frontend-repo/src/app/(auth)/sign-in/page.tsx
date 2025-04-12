"use client";
import { useSignInWithGoogleMutation } from "@/apis/userApi";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SignInPage() {
	const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation();
	const router = useRouter();

	const handleGoogleSignIn = async () => {
		await signInWithGoogle(undefined).unwrap();
		router.replace("/profile");
	};
	return (
		<Button
			onClick={handleGoogleSignIn}
			loading={isLoading}
			startIcon={<GoogleIcon />}
		>
			Sign in with Google
		</Button>
	);
}
