import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
import { markAttendance } from "../controllers/attendancelistController";
import { attendanceListSchema } from "../validators/attendanceValidators";

const router = Router();

router.post("/mark", 
    authMiddleware(attendanceListSchema),
    authorizeRoles("TEACHER", "COURSE_REP"),
    markAttendance
);