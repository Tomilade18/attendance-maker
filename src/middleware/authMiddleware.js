import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const protect = async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   }

   if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
         where: { id: decoded.id },
         select: { id: true, email: true, role: true }
      });

      if (!user) {
         return res.status(401).json({ message: "Not authorized, invalid token" });
      }

      req.user = user;
      next();
   } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
   }
};

const authorizeRoles = (...allowedRoles) => {
   return (req, res, next) => {
      if (!req.user) {
         return res.status(500).json({ message: "Authorization middleware configuration error" });
      }

      if (!allowedRoles.includes(req.user.role)) {
         return res.status(403).json({
            message: `Role ${req.user.role} is not authorized to access this resource`
         });
      }

      next();
   };
};

export { protect, authorizeRoles };