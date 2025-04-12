import type { User } from "@/entities/user";
import { db } from "../config/firebaseConfig";

const USERS_COLLECTION = "USERS";

export const userCollection = {
	/**
	 * Fetch user data from Firestore
	 * @param userId - The ID of the user to fetch
	 */
	async fetchUserData(userId: string): Promise<User | null> {
		try {
			const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();

			if (!userDoc.exists) {
				return null;
			}

			return { id: userDoc.id, ...userDoc.data() } as User;
		} catch (error) {
			console.error("Error fetching user data:", error);
			throw error;
		}
	},

	/**
	 * Update user data in Firestore
	 * @param userId - The ID of the user to update
	 * @param userData - The user data to update
	 */
	async updateUserData(userId: string, userData: Partial<User>): Promise<void> {
		try {
			// Remove id from the data to be updated as it's the document ID
			const { id, ...dataToUpdate } = userData;

			await db.collection(USERS_COLLECTION).doc(userId).update(dataToUpdate);
		} catch (error) {
			console.error("Error updating user data:", error);
			throw error;
		}
	},
};
