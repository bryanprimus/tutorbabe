import "dotenv/config";

import { env } from "@/config/env";
import { auth, db } from "@/config/firebaseConfig";
import cors from "cors";
import express from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors());

declare global {
	namespace Express {
		interface Request {
			user?: DecodedIdToken;
		}
	}
}

const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	photoURL: z.string(),
	createdAt: z.any(),
	updatedAt: z.any(),
	dateOfBirth: z.string().optional(),
	totalAverageWeightRatings: z.number().optional(),
	numberOfRents: z.number().optional(),
	recentlyActive: z.number().optional(),
});

app.post("/init-user-data", async (req, res) => {
	// [0] Validate headers
	const headers = z
		.object({
			authorization: z.string().startsWith("Bearer "),
		})
		.parse(req.headers);

	const idToken = headers.authorization.split("Bearer ")[1];

	// [1] Validate auth - 👈 TODO: Move to middleware
	let decodedToken: DecodedIdToken | undefined;
	try {
		decodedToken = await auth.verifyIdToken(idToken);
		req.user = decodedToken;
	} catch (error) {
		res.status(401).json({
			status: false,
			error: {
				code: "TOKEN_INVALID",
				message: "Unable to validate token",
			},
		});
	}

	if (!decodedToken) {
		res.status(401).json({
			status: false,
			error: {
				code: "TOKEN_INVALID",
				message: "Unable to validate token",
			},
		});
		return;
	}

	const userRecord = await auth.getUser(decodedToken.uid);

	const userDoc = await db.collection("USERS").doc(decodedToken.uid).get();

	if (!userDoc.exists) {
		await db.collection("USERS").doc(decodedToken.uid).set({
			id: decodedToken.uid,
			name: userRecord.displayName,
			email: decodedToken.email,
			photoURL: userRecord.photoURL,
			createdAt: FieldValue.serverTimestamp(),
			updated: FieldValue.serverTimestamp(),
		});
	}

	const newUserDoc = await db.collection("USERS").doc(decodedToken.uid).get();

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

app.get("/fetch-user-data/:userId", async (req, res) => {
	// [0] Validate headers
	const headers = z
		.object({
			authorization: z.string().startsWith("Bearer "),
		})
		.parse(req.headers);

	const idToken = headers.authorization.split("Bearer ")[1];

	// [1] Validate auth - 👈 TODO: Move to middleware
	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		req.user = decodedToken;
	} catch (error) {
		res.status(401).json({
			status: false,
			error: {
				code: "TOKEN_INVALID",
				message: "Unable to validate token",
			},
		});
	}

	// [2] Validate params
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

	// [3] Validate response
	const data = userSchema.parse({
		id: userDoc.id,
		...userDoc.data(),
	});

	res.status(200).json({
		success: true,
		data,
	});
});

app.put("/update-user-data/:userId", async (req, res) => {
	// [0] Validate headers
	const headers = z
		.object({
			authorization: z.string().startsWith("Bearer "),
		})
		.parse(req.headers);

	const idToken = headers.authorization.split("Bearer ")[1];

	// [1] Validate auth - 👈 TODO: Move to middleware
	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		req.user = decodedToken;
	} catch (error) {
		res.status(401).json({
			status: false,
			error: {
				code: "TOKEN_INVALID",
				message: "Unable to validate token",
			},
		});
	}

	// [2] Validate params
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

app.listen(PORT, () => {
	console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
