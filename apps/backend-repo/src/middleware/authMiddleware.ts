import { auth } from "@/config/firebaseConfig";
import { tryCatch } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";
import { z } from "zod";

const headersSchema = z.object({
	authorization: z.string().startsWith("Bearer "),
});

declare global {
	namespace Express {
		interface Request {
			user: DecodedIdToken;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	(async () => {
		const headers = headersSchema.parse(req.headers);
		const idToken = headers.authorization.split("Bearer ")[1];

		const result = await tryCatch(auth.verifyIdToken(idToken));

		if (result.data) {
			req.user = result.data;
			next();
		} else {
			res.status(401).json({
				status: false,
				error: {
					code: "TOKEN_INVALID",
					message: "Unable to validate token",
				},
			});
		}
	})();
};
