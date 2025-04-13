"use client";

import { Box, Button, Typography } from "@mui/material";

import { useSignOutMutation } from "@/apis/authApi";
import { useFetchUserDataQuery } from "@/apis/userApi";
import { CompleteProfileForm } from "@/components/organisms/CompleteProfileForm";
import { Loading } from "@/components/templates/Loading";
import LogoutIcon from "@mui/icons-material/Logout";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function ProfilePage() {
	const userData = useFetchUserDataQuery();

	const [signOut, { isLoading: isLoadingSignOut }] = useSignOutMutation();

	if (userData.isLoading) {
		return <Loading />;
	}

	if (!userData.data?.name || !userData.data.dateOfBirth) {
		return (
			<Box minHeight="100vh" display="grid" sx={{ placeItems: "center" }} p={2}>
				<Box display="flex" flexDirection="column" gap={4}>
					<Typography variant="h5" component="h1" textAlign="center">
						Complete your profile first to Get started
					</Typography>
					<Typography variant="subtitle1" textAlign="center" mt={-2}>
						Your profile will help us to provide the best experience for you to
						show
					</Typography>

					{!!userData.data && <CompleteProfileForm user={userData.data} />}
				</Box>
			</Box>
		);
	}
	return (
		<Box minHeight="100vh" display="grid" sx={{ placeItems: "center" }} p={2}>
			<Box display="flex" flexDirection="column" gap={4}>
				<Box alignSelf="center">
					<img
						alt="user avatar"
						src={userData.data.photoURL}
						width={80}
						height={80}
						style={{ borderRadius: 9999 }}
					/>
				</Box>
				<Typography variant="h5" component="h1" textAlign="center">
					Welcome {userData.data.name}
				</Typography>
				<Typography variant="subtitle1" textAlign="center" mt={-2}>
					Your Rating:{" "}
					{userData.data.totalAverageWeightRatings ?? "You have no rating yet"}
				</Typography>
				<Typography variant="subtitle1" textAlign="center" mt={-2}>
					Rents: {userData.data.numberOfRents ?? 0} times
				</Typography>
				<Typography variant="subtitle1" textAlign="center" mt={-2}>
					Last Active:{" "}
					{dayjs(userData.data.recentlyActive ?? new Date()).fromNow()}
				</Typography>
				<Button
					variant="contained"
					color="error"
					endIcon={<LogoutIcon />}
					loading={isLoadingSignOut}
					onClick={signOut}
				>
					Logout
				</Button>
			</Box>
		</Box>
	);
}
