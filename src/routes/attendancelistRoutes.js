import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
import { markAttendance } from "../controllers/attendancelistController";

const router = Router();

router.post("/mark", 
    authorizeRoles("TEACHER", "COURSE_REP"),
    markAttendance
);