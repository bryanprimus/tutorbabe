"use client";
import { useSignInWithGoogleMutation } from "@/apis/userApi";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

export default function SignInPage() {
	const [signInWithGoogle, { isLoading }] = useSignInWithGoogleMutation();

	const handleGoogleSignIn = async () => {
		signInWithGoogle(undefined);
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
