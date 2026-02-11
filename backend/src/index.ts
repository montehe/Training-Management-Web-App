import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoute";
import formationRoutes from "./routes/formationRoute";
import registrationRoutes from "./routes/registrationRoute";
import cors from "cors";
import dotenv from "dotenv";
//import { notFound } from "./middleware/notFound";
dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;
const db = process.env.MONGO_URI ?? "mongodb://localhost:27017/website";


// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the user routes
app.use("/api/users", userRoutes);

// Use the formation routes
app.use("/api/formations", formationRoutes);
// Use the registration routes
app.use("/api/registrations", registrationRoutes);

//app.use(notFound);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
