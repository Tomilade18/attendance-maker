import z from "zod";

export const attendanceListSchema = z.object({
    classId: z.string().uuid({ message: "Class ID must be a valid UUID" }),

    attendance_date: z
        .string()
        .datetime({ message: "Invalid date format (ISO 8601 expected)" })
        .or(z.string().date())
        .transform((val) => new Date(val)),

    records: z.array(
        z.object({
            studentId: z.string().uuid({ message: "Student ID must be a valid UUID" }),

            status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"], {
                errorMap: () => ({ message: "Status must be one of: PRESENT, ABSENT, LATE, EXCUSED" })
            })
        })
    ).nonempty("Attendance cannot be empty")
});