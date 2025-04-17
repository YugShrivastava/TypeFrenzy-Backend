import { configDotenv } from "dotenv";
configDotenv();

const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    PORT: process.env.PORT,
    ABSTRACT_API_KEY: process.env.ABSTRACT_API_KEY
}

export default config