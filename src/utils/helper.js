import bcrypt, { genSalt } from "bcryptjs";

const saltRounds  = 10;

export const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);

}

