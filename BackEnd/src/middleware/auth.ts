import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// add the auth middleware to the request of the booking
export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
    return;
  }
};
