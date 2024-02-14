var jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants";

const secretKey: string = `${process.env.SECRET_KEY}`;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role !== UserRole.ADMIN)
      return res.status(401).json({ message: "Unauthorized: Invalid role" });
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
