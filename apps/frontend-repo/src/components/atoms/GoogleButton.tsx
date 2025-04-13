import { Button, type ButtonProps } from "@mui/material";
import type React from "react";

// SVG for Google logo - using inline SVG to ensure exact Google branding
const GoogleLogo = () => (
	<svg
		width="18"
		height="18"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 48 48"
	>
		<title>Google Logo</title>
		<path
			fill="#EA4335"
			d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
		/>
		<path
			fill="#4285F4"
			d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
		/>
		<path
			fill="#FBBC05"
			d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
		/>
		<path
			fill="#34A853"
			d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
		/>
		<path fill="none" d="M0 0h48v48H0z" />
	</svg>
);

type GoogleButtonProps = Omit<ButtonProps, "startIcon">;

export const GoogleButton: React.FC<GoogleButtonProps> = ({
	children = "Sign in with Google",
	sx,
	...props
}) => {
	return (
		<Button
			variant="outlined"
			startIcon={<GoogleLogo />}
			sx={{
				fontFamily: "Roboto, sans-serif",
				textTransform: "none",
				fontWeight: 500,
				fontSize: "14px",
				letterSpacing: "0.25px",
				color: "rgba(0, 0, 0, 0.87)",
				backgroundColor: "#ffffff",
				borderColor: "rgba(0, 0, 0, 0.12)",
				boxShadow:
					"0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.2)",
				"&:hover": {
					backgroundColor: "#f8f8f8",
					borderColor: "rgba(0, 0, 0, 0.12)",
					boxShadow:
						"0 1px 2px 0 rgba(0,0,0,0.14), 0 1px 3px 1px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
				},
				padding: "0 12px",
				height: "40px",
				...sx,
			}}
			{...props}
		>
			{props.loading ? "Signing in..." : children}
		</Button>
	);
};
