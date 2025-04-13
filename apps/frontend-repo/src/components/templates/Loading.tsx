import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
	return (
		<Box minHeight="100vh" display="grid" sx={{ placeItems: "center" }}>
			<CircularProgress />
		</Box>
	);
};
