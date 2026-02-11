import User from "./src/models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { sys } from "typescript";
import mongoose from "mongoose";
dotenv.config();

const sendMail = (password: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amaramontaha358@gmail.com",
      pass: "kuex dxdy ubgv stsd",
    },
    tls: {
      rejectUnauthorized: false, // For testing only; should be removed in production
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.DEFAULT_ADMIN_EMAIL,
    subject: "Admin Created",
    html: `
    <span style="color:red">${password}</span> 
  `,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log("email sent with success.");
      sys.exit(0);
    })
    .catch(() => {
      console.log("error....");
    });
};

const createUser = () => {
  const password = Math.random().toString(36);

  const newAdmin = new User({
    username: process.env.DEFAULT_ADMIN_USERNAME,
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: bcrypt.hashSync(password, 10),
    role: "admin",
  });

  newAdmin
    .save()
    .then(() => {
      sendMail(password);
    })
    .catch((err) => {
      console.log(err);
    });
};

const db = process.env.MONGO_URI ?? "mongodb://localhost:27017/website";

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
    createUser();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
