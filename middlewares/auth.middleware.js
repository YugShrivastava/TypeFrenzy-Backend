import UserModel from "../models/user.model.js";
import isEmailValid from "../services/isEmailValid.js";
import { validateEmail, validatePassword } from "../utils/validator.js";

const registerMiddleware = async (req, res, next) => {
    const user = req.body;
    req.body.username = user.username?.trim();
    req.body.email = user.email?.trim();
    req.body.password = user.password?.trim();

    const { username, email, password } = req.body;
    console.log({username, email, password})

    if(username.split(' ').length !== 1) return res.status(400).json({error: true, message: "Space is not allowed in the username"})
    if (!username.trim()) return res.status(400).json({ error: true, message: "username required" });
    if (!email.trim()) return res.status(400).json({ error: true, message: "email required" });
    if (!password.trim()) return res.status(400).json({ error: true, message: "password required" });

    if (!validateEmail(email.trim())) return res.status(400).json({ error: true, message: "incorrect email pattern" });
    if (!validatePassword(password.trim())) return res.status(400).json({ error: true, message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character." });

    const {deliverability, is_valid_format, is_smtp_valid, error} = await isEmailValid(email.trim());
    if (error) return res.status(500).json({ error: true, message: "Internal Server Error" });
    if (
        deliverability === "UNDELIVERABLE" ||
        (is_valid_format.value === false &&
        is_smtp_valid.value === false)
    ) return res.status(400).json({
        error: true,
        message: "Please enter a valid email address"
    });

    const usernameConflict = await UserModel.findOne({
        username
    })
    if (usernameConflict) return res.status(400).json({ error: true, message: "Username already taken" });

    const emailConflict = await UserModel.findOne({
        email
    })

    if (emailConflict) return res.status(400).json({ error: true, message: "Email already taken" });

    return next();
}

const loginMiddleware = (req, res, next) => {
    const user = req.body;
    req.body.username = user.username?.trim();
    req.body.password = user.password?.trim();

    const { username, password } = req.body;
    console.log({username, password})

    if (!username.trim()) return res.status(400).json({ error: true, message: "username required" });
    if (!password.trim()) return res.status(400).json({ error: true, message: "password required" });
    
    return next();
}

const verifyTokenMiddleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (header === undefined) return res.status(400).json({ error: true, message: "no token received" });

    const token = header.split('Bearer ');
    if (token === undefined) return res.status(400).json({ error: true, message: "no token received" });
    if (token.length !== 2) return res.status(400).json({ error: true, message: "no token received" });

    req.body = token[1].trim();
    return next();
}

export {
    registerMiddleware,
    loginMiddleware,
    verifyTokenMiddleware
}