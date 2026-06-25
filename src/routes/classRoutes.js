import { Router } from "express";
import { createClass, getClassById } from "../controllers/classController";

const router = Router();


router.get("/classes/:id", getClassById);

router.post("/classes", createClass);