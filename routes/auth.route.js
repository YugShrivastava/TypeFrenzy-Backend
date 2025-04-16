import { Router } from "express";
import { handleUserRegister, handleUserLogin, handleTokenVerification } from "../controllers/auth.controller.js"
import { loginMiddleware, registerMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', registerMiddleware, handleUserRegister);
authRouter.post('/login', loginMiddleware, handleUserLogin);
authRouter.get('/verify', verifyTokenMiddleware, handleTokenVerification);

export default authRouter