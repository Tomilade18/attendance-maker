import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { registerSchema, loginSchema } from "../validators/authValidators.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);

router.post("/login", validateRequest(loginSchema), login);

router.post("/logout", logout);


export default router