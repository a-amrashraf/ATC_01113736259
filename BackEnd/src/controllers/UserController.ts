import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

// This function handles user registration
// It checks if the user already exists, hashes the password, and creates a new user
export const registeruser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     res.status(400).json({ message: "User already exists" });
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginuser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
       res.status(400).json({ message: "User Not Found" });
       return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return
    }

    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        isadmin: user.isadmin,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error user" });
  }
};
