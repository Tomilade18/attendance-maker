import { Router } from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { markAttendance } from "../controllers/attendancelistController.js";
import { attendanceListSchema } from "../validators/attendanceValidators.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post(
    "/mark",
    protect,
    authorizeRoles("TEACHER", "COURSE_REP"),
    validateRequest(attendanceListSchema),
    markAttendance
);

export default router;