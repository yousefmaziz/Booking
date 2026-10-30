import {
  createUserService,
  getAllUsersService,
  getUserByEmailService,
} from "../services/UserService.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema } from "../Validators/UserValidate.js";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check existing user
    const findUser = await getUserByEmailService(email);

    if (findUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await createUserService({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmailService(req.body.email);
    const isPasswordValid = user
      ? await bcrypt.compare(req.body.password, user.password)
      : false;
    if (!user || !isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );
    res.status(200).json({
      message: "User logged in successfully",
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
    });
  }
};
