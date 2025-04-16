import { createServer } from "http";
import config from "./config/config.js";
import app from "./app.js";
import connect from "./connection.js"

const PORT = config.PORT || 5000;
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})

connect.then(() => console.log('MongoDB connected')).catch(err => console.log('Error while connecting to MongoDB: ', err))

