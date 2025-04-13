"use client";

import { Loading } from "@/components/templates/Loading";
import type { RootState } from "@/store";
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
			router.replace("/sign-in");
		}
	}, [initialized, user, router]);

	if (!initialized || !user) return <Loading />;

	return <>{children}</>;
}
