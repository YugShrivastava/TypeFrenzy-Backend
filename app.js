import express from "express";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoute);

export default app