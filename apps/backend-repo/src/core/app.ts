import "dotenv/config";

import cors from "cors";
import express from "express";
import userRoutes from "../routes/userRoutes";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (_, res) => {
	res.send("Hello API");
});

// User routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
	console.log(`🚀 Server listening at http://localhost:${port}`);
});
