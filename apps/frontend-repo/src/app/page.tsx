import { Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<Typography component={Link} href="/sign-in">
			Sign In
		</Typography>
	);
}
