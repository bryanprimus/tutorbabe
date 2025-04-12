"use client";

import type { RootState } from "@/store";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProtectedLayout({
	children,
}: { children: React.ReactNode }) {
	const { user, initialized } = useSelector((state: RootState) => state.auth);
	const router = useRouter();

	useEffect(() => {
		if (initialized && !user) {
			router.replace("/sign-in"); // redirect to login if not authenticated
		}
	}, [initialized, user, router]);

	if (!initialized) return <CircularProgress />;
	if (!user) return <CircularProgress />;

	return <>{children}</>;
}
