import config from "./config/config.js";
import { connect } from "mongoose";

export default connect(config.MONGO_URL);