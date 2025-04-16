import jwt from "jsonwebtoken";
import config from "../config/config.js"

const secret = config.JWT_SECRET;

const createToken = (user) => {
    delete user.password;
    delete user.salt;

    const payload = { ...user };

    console.log(payload);

    return jwt.sign(payload, secret);
}

const validateToken = (token) => {
    return jwt.verify(token, secret, (err, user) => {
        if (err) return false;
        return user;
    });
}

export {
    createToken,
    validateToken
}