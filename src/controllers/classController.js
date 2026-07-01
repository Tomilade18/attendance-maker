import { prisma } from "../config/db.js";

const createClass = async (req, res) => {
    const { name, course_no, type } = req.body;

    const newClass = await prisma.class.create({
        data: {
            name,
            course_no,
            type
        }
    });
    
    res
        .status(201)
        .json({
            status: "Successful",
            message: "Class created successfully",
            data: newClass
        });
};

const getClassById = async (req, res) => {
    const { id } = req.params;

    const getClass = await prisma.class.findUnique({
        where: { id }
    });

    if (!getClass) {
        return res
            .status(404)
            .json({ message: "Class not found" });
    }

    res
        .status(200)
        .json({
            status: "Successful",
            data: getClass
        });
};

export { createClass, getClassById };