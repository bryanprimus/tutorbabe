import { AuthListenerProvider } from "@/components/templates/AuthListenerProvider";
import theme from "@/config/theme";
import { Providers } from "@/store/Providers";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
	title: "Create T3 App",
	description: "Generated by create-t3-app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={geist.className}>
			<body>
				<Providers>
					<AuthListenerProvider>
						<AppRouterCacheProvider>
							<CssBaseline />
							<ThemeProvider theme={theme}>{children}</ThemeProvider>
						</AppRouterCacheProvider>
					</AuthListenerProvider>
				</Providers>
			</body>
		</html>
	);
}
