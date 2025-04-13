"use client";

import { useUpdateUserDataMutation } from "@/apis/userApi";
import { Box, Button, TextField } from "@mui/material";
import { type User, updateUserSchema } from "@repo/shared";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const completeProfileFormSchema = updateUserSchema
	.omit({ dateOfBirth: true })
	.merge(
		z.object({
			dateOfBirth: z.string(),
		}),
	);

export const CompleteProfileForm = ({ user }: { user: User }) => {
	const [updateUserData, { isLoading: isLoadingUpdateUserData }] =
		useUpdateUserDataMutation();

	const form = useForm({
		defaultValues: {
			name: user.name,
			dateOfBirth: user.dateOfBirth || "",
		},
		validators: {
			onChange: completeProfileFormSchema,
		},
		onSubmit: async ({ value }) => {
			await updateUserData(value).unwrap();
			// TODO: Update to cache invalidation
			window.location.reload();
		},
	});

	return (
		<Box
			onSubmit={(evt) => {
				evt.preventDefault();
				evt.stopPropagation();
				form.handleSubmit();
			}}
			component="form"
			display="flex"
			flexDirection="column"
			gap={4}
		>
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
		</Box>
	);
};
