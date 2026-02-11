import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import Joi from "joi";
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET ?? "montaha";

// email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "amaramontaha358@gmail.com",
    pass: "kuex dxdy ubgv stsd",
  },
  tls: {
    rejectUnauthorized: false, 
  },
});


// Register User
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password, confirmPassword } = req.body;

  // Define validation schema for the user registration
  const registerUserValidation = Joi.object({
    username: Joi.string().max(20).min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .max(20)
      .min(6)
      .regex(/[A-Za-z]{8,}$/)
      .required(),
    confirmPassword: Joi.string().equal(password ?? "").required(),
    name: Joi.string().max(20).min(6).required(),
    tel: Joi.string().required(), 
    adresse: Joi.string().required(), 
    fonction: Joi.string().required() 
  }).required();

  // Basic validation
  const validatedRequest = registerUserValidation.validate(req.body);

  if (validatedRequest.error) {
    const errorMessage = validatedRequest.error.message;
    return res.status(400).json({ message: errorMessage });
  }

  const { username, email,tel, adresse, fonction } = validatedRequest.value;

  try {
    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already in use" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      role: "user", 
      tel,
      adresse,
      fonction
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Logout User
export const logoutUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logout successful" });
};

//GETPROFILE
export const getProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
// UPDATE PROFILE
export const updateProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const userId = decoded.id;
    const { username, email, tel, adresse, fonction } = req.body;

    const errors: { [key: string]: string } = {};

    // Check for missing fields
    if (!username || !email || !tel || !adresse || !fonction) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      errors.email = "Invalid email format";
    }

    // Validate fonction value
    if (fonction !== "etudiant" && fonction !== "employer") {
      errors.fonction = "Invalid fonction value";
    }

    // Check for existing username or email
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
      _id: { $ne: userId },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        errors.username = "Username already in use";
      }
      if (existingUser.email === email) {
        errors.email = "Email already in use";
      }
    }

    // If there are errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Update user profile
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = username;
    user.email = email;
    user.tel = tel;
    user.adresse = adresse;
    user.fonction = fonction;

    await user.save();

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Forgot Password
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token for password reset link
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "120s" }); 

    // Send email with password reset link
    const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password/${token}`; 
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Lien de réinitialisation du mot de passe",
      html: `
        <p>Vous avez demandé une réinitialisation de votre mot de passe, cliquez ici  <a href="${resetPasswordLink}">here</a> pour réinitialiser votre mot de passe.</p>
        <p>Si vous n'avez pas demandé cela, veuillez ignorer cet e-mail.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
// Reset Password
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  // Basic validation
  if (!newPassword || !confirmNewPassword) {
    return res
      .status(400)
      .json({ message: "New password and confirm password are required" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Fetch all users except passwords
    const users = await User.find().select('-password'); // Exclude password from response

    // Return the list of users
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};