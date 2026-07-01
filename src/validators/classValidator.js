import z from "zod";

const createClassSchema = z.object({
    course_no: z
        .string()
        .trim()
        .min(1, "Course number/code is required")
        .max(20, "Course number must not exceed 20 characters"),

    name: z
        .string()
        .trim()
        .min(1, "Class name is required")
        .min(3, "Class name must be at least 3 characters"),

    type: z
        .string()
        .trim()
        .min(1, "Class type is required")
        .refine(
            (type) => ["Lecture", "Practical", "Tutorial", "Lab", "Seminar"].includes(type),
            "Class type must be one of: Lecture, Practical, Tutorial, Lab, or Seminar"
        )
});

const updateClassSchema = z.object({
    course_no: z
        .string()
        .trim()
        .min(1, "Course number/code is required")
        .max(20, "Course number must not exceed 20 characters")
        .optional(),

    name: z
        .string()
        .trim()
        .min(3, "Class name must be at least 3 characters")
        .optional(),

    type: z
        .string()
        .trim()
        .refine(
            (type) => ["Lecture", "Practical", "Tutorial", "Lab", "Seminar"].includes(type),
            "Class type must be one of: Lecture, Practical, Tutorial, Lab, or Seminar"
        )
        .optional()
}).refine((data) => Object.keys(data).length > 0, "At least one field must be provided for update");

export { createClassSchema, updateClassSchema };
