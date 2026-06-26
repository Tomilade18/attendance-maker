import z from "zod";


const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(4, "Name must be a least 2 characters"),

    email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),

    password: z
    .string()
    .min(6, "Password is required"),


    department: z
    .string()
    .min(4, "You must choose a department")

});


const loginSchema = z.object({
    email: z
    .string()
    .trim()
    .min(1, "Please provide a valid email")
    .email("Please provide a vakid email")
    .toLowerCase(),

    password: z
    .string()
    .min(1, "Password is required"),
});

export { registerSchema, loginSchema}