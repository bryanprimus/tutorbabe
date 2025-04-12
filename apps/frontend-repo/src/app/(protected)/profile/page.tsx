"use client";

import { useSignOutMutation } from "@/apis/userApi";
import type { RootState } from "@/store";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function ProfilePage() {
	const { user } = useSelector((state: RootState) => state.auth);

	const [signOut, { isLoading }] = useSignOutMutation();
	return (
		<>
			<Typography>Name: {user?.displayName}</Typography>

			<Button
				variant="contained"
				color="error"
				onClick={signOut}
				loading={isLoading}
			>
				Sign Out
			</Button>
		</>
	);
}
