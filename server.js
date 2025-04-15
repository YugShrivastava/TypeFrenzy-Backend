import express from "express";
import { createServer } from "http";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})