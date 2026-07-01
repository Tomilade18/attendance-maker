import { Router } from "express";
import { createClass, getClassById } from "../controllers/classController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { createClassSchema } from "../validators/classValidator.js";

const router = Router();

router.get("/classes/:id", getClassById);
router.post("/classes", validateRequest(createClassSchema), createClass);

export default router;