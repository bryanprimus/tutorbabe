import { auth, db } from "@/config/firebaseConfig";
import { userRepository } from "@/repository/userCollection";

import { updateUserSchema, userSchema } from "@repo/shared";
import type { Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

export const initUserData = async (req: Request, res: Response) => {
	const userInRequest = req.user;
	const userAuth = await auth.getUser(userInRequest.uid);
	const userInDb = await userRepository.fetchUserData(userAuth.uid);

	if (!userInDb) {
		await db.collection("USERS").doc(userAuth.uid).set({
			id: userAuth.uid,
			name: userAuth.displayName,
			email: userAuth.email,
			photoURL: userAuth.photoURL,
			createdAt: FieldValue.serverTimestamp(),
			updated: FieldValue.serverTimestamp(),
		});
	}

	const newUserInDb = await userRepository.fetchUserData(userAuth.uid);

	res.status(200).json({
		success: true,
		data: userSchema.parse(newUserInDb),
	});
};

const fetchUserDataParamsSchema = z.object({
	userId: z.string(),
});

export const fetchUserData = async (req: Request, res: Response) => {
	const params = fetchUserDataParamsSchema.parse(req.params);
	const userInDb = await userRepository.fetchUserData(params.userId);

	if (!userInDb) {
		res.status(400).json({
			success: false,
			error: { code: "USER_NOT_FOUND", message: "User not found" },
		});
	}

	res.status(200).json({
		success: true,
		data: userSchema.parse(userInDb),
	});
};

const updateUserDataParamsSchema = z.object({
	userId: z.string(),
});

export const updateUserData = async (req: Request, res: Response) => {
	const params = updateUserDataParamsSchema.parse(req.params);

	const body = updateUserSchema
		.pick({ name: true, dateOfBirth: true })
		.parse(req.body);

	await userRepository.updateUserData(params.userId, body);

	const userInDb = await userRepository.fetchUserData(params.userId);

	res.status(200).json({
		success: true,
		data: userSchema.parse(userInDb),
	});
};
