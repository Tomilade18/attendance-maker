import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidators.js";


const router = Router();

router.post("/register", registerSchema, register);

router.post("/login", loginSchema, login);

router.post("/logout", logout);


export default router