"use client";

import GoogleButton from "@/components/atoms/buttons/GoogleButton";
import { auth } from "@/config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import styles from "./SignInForm.module.css";

const SignInForm = () => {
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
		<div className={styles.signInForm}>
			<h2 className={styles.formTitle}>Sign In</h2>
			<div className={styles.formContent}>
				<GoogleButton onClick={handleGoogleSignIn} />
				{isLoading && <p>Loading...</p>}
				{error && <p className={styles.errorMessage}>{error}</p>}
			</div>
		</div>
	);
};

export default SignInForm;
