import { auth, db } from "@/config/firebaseConfig";

import { userSchema } from "@repo/shared";
import { Router } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

import { authMiddleware } from "@/middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/init-user-data", async (req, res) => {
	const user = req.user;

	const userRecord = await auth.getUser(user.uid);

	const userDoc = await db.collection("USERS").doc(user.uid).get();

	if (!userDoc.exists) {
		await db.collection("USERS").doc(user.uid).set({
			id: user.uid,
			name: userRecord.displayName,
			email: user.email,
			photoURL: userRecord.photoURL,
			createdAt: FieldValue.serverTimestamp(),
			updated: FieldValue.serverTimestamp(),
		});
	}

	const newUserDoc = await db.collection("USERS").doc(user.uid).get();

	// [2] Validate response
	const data = userSchema.parse({
		id: newUserDoc.id,
		...newUserDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
});

router.get("/fetch-user-data/:userId", async (req, res) => {
	// [1] Validate params
	const params = z
		.object({
			userId: z.string(),
		})
		.parse(req.params);

	const userDoc = await db.collection("USERS").doc(params.userId).get();

	if (!userDoc.exists) {
		res.status(400).json({
			status: false,
			error: {
				code: "USER_NOT_FOUND",
				message: "Unable to find user information",
			},
		});
	}

	// [2] Validate response
	const data = userSchema.parse({
		id: userDoc.id,
		...userDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
});

router.put("/update-user-data/:userId", async (req, res) => {
	// [1] Validate params
	const params = z
		.object({
			userId: z.string(),
		})
		.parse(req.params);

	// [3] Validate body
	const body = userSchema
		.pick({ name: true, dateOfBirth: true })
		.parse(req.body);

	await db.collection("USERS").doc(params.userId).update(body);
	const userDoc = await db.collection("USERS").doc(params.userId).get();

	// [4] Validate response
	const data = userSchema.parse({
		id: userDoc.id,
		...userDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
});

export default router;
