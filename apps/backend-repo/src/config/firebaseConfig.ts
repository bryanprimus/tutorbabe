import { type ServiceAccount, cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../../serviceAccountKey.json" assert {
	type: "json",
};

const app = initializeApp({
	credential: cert(serviceAccount as ServiceAccount),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
