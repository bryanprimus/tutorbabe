import { Box, Button, Typography } from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";

export default function HomePage() {
	return (
		<Box minHeight="100vh" display="grid" sx={{ placeItems: "center" }} p={2}>
			<Box display="flex" flexDirection="column" gap={4}>
				<Typography variant="h4" component="h1" textAlign="center">
					TutorBabe
				</Typography>
				<Typography variant="subtitle1" textAlign="center" mt={-2}>
					Connect with expert tutors for personalized learning experiences
				</Typography>

				<Button
					variant="contained"
					endIcon={<LoginIcon />}
					component={Link}
					href="/sign-in"
				>
					Sign in to Continue
				</Button>
			</Box>
		</Box>
	);
}
