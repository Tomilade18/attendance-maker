import jwt from "jsonwebtoken";
import prisma from "../config/db.js"

 const authMiddleware  = async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   }

   if (!token) {
    return res.status(401).json({message: "Not authorized, token missing"});
   }

   try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {id: decoded.id},
      select: {id: true, email: true, role: true}
    }) 


   } catch (error) {
    return res.status(401).json({message: "Not authorized, invalid tolen"});
   }
}

const authorizeRoles = (...allowedRoles) => {
   if (!req.user) {
      return res.status(500).json({message: "Authorization middleware configuration error"});

      if (!allowedRoles.includes(req.user.role)) {
         return res.status(403).json({
            message: "Role (${req.user.role}) is not authorized to access this resource"
         })
      }

      next();
   };
};

export {authMiddleware, authorizeRoles}