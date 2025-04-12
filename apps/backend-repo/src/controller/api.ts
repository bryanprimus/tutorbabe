import type { User } from "@/entities/user";
import type { Request, Response } from "express";
import { userCollection } from "../repository/userCollection";

export const userController = {
	async fetchUserData(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.params.userId;

			if (!userId) {
				res.status(400).json({ message: "User ID is required" });
				return;
			}

			const userData = await userCollection.fetchUserData(userId);

			if (!userData) {
				res.status(404).json({ message: "User data not found" });
				return;
			}

			res.status(200).json(userData);
		} catch (error) {
			console.error("Error in fetchUserData controller:", error);
			res.status(500).json({ message: "Internal server error", error });
		}
	},

	async updateUserData(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.params.userId;

			if (!userId) {
				res.status(400).json({ message: "User ID is required" });
				return;
			}

			const userData: Partial<User> = req.body;

			// Validate user data
			if (!userData || Object.keys(userData).length === 0) {
				res.status(400).json({ message: "User data is required" });
				return;
			}

			await userCollection.updateUserData(userId, userData);

			res.status(200).json({ message: "User data updated successfully" });
		} catch (error) {
			console.error("Error in updateUserData controller:", error);
			res.status(500).json({ message: "Internal server error", error });
		}
	},
};
