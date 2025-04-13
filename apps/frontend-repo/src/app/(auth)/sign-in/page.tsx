import { Box, Typography } from "@mui/material";

import { SignInForm } from "@/components/organisms/SignInForm";

export default function SignInPage() {
	return (
		<Box minHeight="100vh" display="grid" sx={{ placeItems: "center" }} p={2}>
			<Box display="flex" flexDirection="column" gap={4}>
				<Typography variant="h5" component="h1" textAlign="center">
					Sign in to TutorBabe Account
				</Typography>
				<Typography variant="subtitle1" textAlign="center" mt={-2}>
					Get the most out of TutorBabe with your account
				</Typography>

				<SignInForm />
			</Box>
		</Box>
	);
}
