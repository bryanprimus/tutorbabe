import { auth, db } from "@/config/firebaseConfig";

import { updateUserSchema, userSchema } from "@repo/shared";
import type { Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

export const initUserData = async (req: Request, res: Response) => {
	const userInRequest = req.user;
	const user = await auth.getUser(userInRequest.uid);

	const userDoc = await db.collection("USERS").doc(user.uid).get();

	if (!userDoc.exists) {
		await db.collection("USERS").doc(user.uid).set({
			id: user.uid,
			name: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			createdAt: FieldValue.serverTimestamp(),
			updated: FieldValue.serverTimestamp(),
		});
	}

	const newUserDoc = await db.collection("USERS").doc(user.uid).get();

	const data = userSchema.parse({
		id: newUserDoc.id,
		...newUserDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
};

const fetchUserDataParamsSchema = z.object({
	userId: z.string(),
});

export const fetchUserData = async (req: Request, res: Response) => {
	const params = fetchUserDataParamsSchema.parse(req.params);
	const userDoc = await db.collection("USERS").doc(params.userId).get();

	if (!userDoc.exists) {
		res.status(400).json({
			success: false,
			error: { code: "USER_NOT_FOUND", message: "User not found" },
		});
	}

	const data = userSchema.parse({
		id: userDoc.id,
		...userDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
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

	await db.collection("USERS").doc(params.userId).update(body);

	const userDoc = await db.collection("USERS").doc(params.userId).get();
	const data = userSchema.parse({
		id: userDoc.id,
		...userDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
};
