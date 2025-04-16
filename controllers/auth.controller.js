import UserModel from "../models/user.model.js";
import { createToken, validateToken } from "../services/jwt.js";

const handleUserRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const newUser = UserModel.create({
            email, username, password
        });

        if (!newUser) return res.status(409).json({ error: true, message: "Error in creating user" });
        return res.status(201).json({ message: "user created successfully" });

    } catch (error) {
        console.log('MongoDB error: ', error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

const handleUserLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log({ username, password });

        const exists = await UserModel.matchPassword(username, password);

        if (exists?.error) return res.status(404).json(exists);

        delete exists.user.password
        delete exists.user.salt

        const token = createToken(exists.user);

        return res.status(202).json({ token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

const handleTokenVerification = async (req, res) => {
    try {
        const token = req.body;
        const user = validateToken(token);

        if (!user) return res.status(404).json({ error: true, message: "INVALID TOKEN" });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

export {
    handleUserRegister,
    handleUserLogin,
    handleTokenVerification
}