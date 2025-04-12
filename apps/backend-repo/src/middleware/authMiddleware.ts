import type { NextFunction, Request, Response } from "express";
import { type DecodedIdToken, getAuth } from "firebase-admin/auth";

declare global {
	namespace Express {
		interface Request {
			user?: DecodedIdToken;
		}
	}
}

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	(async () => {
		const authHeader = req.headers.authorization;

		if (!authHeader?.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Missing or invalid token" });
		}

		const idToken = authHeader.split("Bearer ")[1];
		try {
			const decodedToken = await getAuth().verifyIdToken(idToken);
			req.user = decodedToken;
			next();
		} catch (error) {
			res.status(401).json({ message: "Token verification failed", error });
		}
	})();
};
