"use client";

import { auth } from "@/config/firebaseConfig";
import type { AppDispatch } from "@/store";
import { setUser } from "@/store/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AuthListenerProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			dispatch(setUser(user));
		});
		return unsub;
	}, [dispatch]);
	return <>{children}</>;
};
