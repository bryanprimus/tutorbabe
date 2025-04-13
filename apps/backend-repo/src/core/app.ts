import "dotenv/config";

import { env } from "@/config/env";
import cors from "cors";
import express from "express";

import userRoutes from "@/routes/userRoutes";

const app = express();
const PORT = env.PORT;

app.use(express.json());
app.use(cors());

app.use(userRoutes);

app.listen(PORT, () => {
	console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
