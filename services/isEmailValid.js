import config from "../config/config.js"
import axios from "axios";

const ABSTRACT_API_URL = `https://emailvalidation.abstractapi.com/v1/?api_key=${config.ABSTRACT_API_KEY}&email=`

const isEmailValid = async (email) => {
    try {
        const res = await axios.get(`${ABSTRACT_API_URL}${email}`);
        return res.data;
    } catch (error) {
        return error?.response?.data;
    }
}

export default isEmailValid