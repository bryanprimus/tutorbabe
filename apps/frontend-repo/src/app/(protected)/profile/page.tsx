"use client";

import { useSignOutMutation } from "@/apis/authApi";
import {
	useFetchUserDataQuery,
	useUpdateUserDataMutation,
} from "@/apis/userApi";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const updateProfileFormSchema = z.object({
	name: z.string().min(1),
	dateOfBirth: z.string(),
});

export default function ProfilePage() {
	const [signOut, { isLoading: isLoadingSignOut }] = useSignOutMutation();
	const userData = useFetchUserDataQuery();

	const [updateUserData, { isLoading: isLoadingUpdateUserData }] =
		useUpdateUserDataMutation();

	const form = useForm({
		defaultValues: {
			name: userData.data?.name ?? "",
			dateOfBirth: userData.data?.dateOfBirth ?? "",
		},
		validators: {
			onChange: updateProfileFormSchema,
		},
		onSubmit: ({ value }) => {
			updateUserData(value);
		},
	});

	return (
		<>
			<Container sx={{ py: 4 }}>
				<Paper
					component="form"
					sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
					onSubmit={(evt) => {
						evt.preventDefault();
						evt.stopPropagation();
						form.handleSubmit(evt);
					}}
				>
					<Typography variant="h5" component="h1">
						Profile
					</Typography>
					<form.Field
						name="name"
						// biome-ignore lint/correctness/noChildrenProp: <explanation>
						children={(field) => {
							return (
								<TextField
									label="Name"
									placeholder="Enter your name"
									size="small"
									fullWidth
									value={field.state.value}
									onChange={(evt) => field.handleChange(evt.target.value)}
									helperText={
										typeof field.state.meta.errors[0] === "string"
											? field.state.meta.errors[0]
											: undefined
									}
									error={field.state.meta.errors?.length > 0}
								/>
							);
						}}
					/>
					<form.Field
						name="dateOfBirth"
						// biome-ignore lint/correctness/noChildrenProp: <explanation>
						children={(field) => {
							return (
								<TextField
									label="Date of Birth"
									placeholder="YYYY-MM-DD"
									size="small"
									fullWidth
									type="date"
									slotProps={{
										inputLabel: {
											shrink: true,
										},
									}}
									value={field.state.value}
									onChange={(evt) => field.handleChange(evt.target.value)}
									helperText={
										typeof field.state.meta.errors[0] === "string"
											? field.state.meta.errors[0]
											: undefined
									}
									error={field.state.meta.errors?.length > 0}
									sx={{ mt: 2 }}
								/>
							);
						}}
					/>

					<Button
						type="submit"
						variant="contained"
						fullWidth
						sx={{ mt: 2 }}
						loading={isLoadingUpdateUserData}
					>
						Update Profile
					</Button>
				</Paper>
				<Button
					variant="contained"
					color="error"
					onClick={signOut}
					loading={isLoadingSignOut}
					fullWidth
					sx={{ mt: 2 }}
				>
					Sign Out
				</Button>
			</Container>
		</>
	);
}
