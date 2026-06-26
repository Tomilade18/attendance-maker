import z, { record } from "zod";

export const attendanceListSchema = z.object({
    classId: z
    .string()
    .uuid(),

    attendance_date: z
    .string().datetime({ message: "Invalid date format (ISO 8601 expected)"})
    .or(z.string().date())
    .transform((val) => new Date(val)),

    records: z.array(
       z.object({
        studentId: z.number().uuid(),

        status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'], {
            errorMap: () => ({ message: "Status must be "})
        })
       }) 
    ).nonempty("Attendance cannot be empty")
})