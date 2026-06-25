import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
import { hashedPassword } from "../utils/helper.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {

    const {name, email, password, department} = req.body;

    const userExists = await prisma.user.findUnique({
        where: {email: email},
    })

    if (userExists) {
        return res
        .status(400)
        .json("User already exist")
    };

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await hashedPassword(password),
            department,
        },
    });

    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email,
            },
            token,
        },
    });
};

const login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    if (!user){
       return res.status(401).json("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json("Invalid email or password");
    }

    const token = generateToken(user.id, res)

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            },
            token,
        },
    })

};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res
    .status(200)
    .json({
        status: "success",
        message: "Logout Successful"
    })
}

export {register, login, logout}