"use client";

import { auth } from "@/config/firebaseConfig";
import { Alert, Box, Button } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			console.log("Google sign-in successful", result.user);
		} catch (error) {
			console.error("Error during Google sign-in:", error);
			setError("Failed to sign in with Google. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Box gap={2}>
			<Button
				onClick={handleGoogleSignIn}
				loading={isLoading}
				startIcon={<GoogleIcon />}
			>
				Sign in with Google
			</Button>
			{error && <Alert severity="error">{error}</Alert>}
		</Box>
	);
}
