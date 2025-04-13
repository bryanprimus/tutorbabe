import { type UpdateUser, userSchema } from "@repo/shared";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../config/firebaseConfig";

/**
 * User collection repository for Firestore operations
 */
export class UserRepository {
	private collection = db.collection("USERS");

	/**
	 * Fetch user data by user ID
	 */
	async fetchUserData(userId: string) {
		const userDoc = await this.collection.doc(userId).get();
		const result = userSchema.safeParse({
			id: userDoc.id,
			...userDoc.data(),
		});

		if (result.success) {
			return result.data;
		}
		return undefined;
	}

	/**
	 * Update user data by user ID
	 */
	async updateUserData(userId: string, userData: UpdateUser) {
		const updateData = {
			...userData,
			updatedAt: FieldValue.serverTimestamp(),
		};

		await this.collection.doc(userId).update(updateData);

		const updatedUser = userSchema.parse(await this.fetchUserData(userId));
		return updatedUser;
	}
}

export const userRepository = new UserRepository();
