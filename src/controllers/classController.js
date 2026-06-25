import { prisma } from "../config/db";

 const createClass = async (res, req) => {
    const {name, course_no, type } = res.body;

    const newClass = await prisma.user.create({
        data: name,
        course_no,
        type
    });
    
    res
    .status(201)
    .json({
        status: "Successful",
        message: "Class created successfully"
    });
};

const getClassById = async (res, req) => {

    const {id} = req.params;

    const getClass = await prisma.user.findUnique({
        where: {id},
    });

    if(!getClass) {
        return res
        .status(404)
        .json("Class not Found")
    }

    res.status(200);
}

export {createClass, getClassById}