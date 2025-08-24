import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import User from "./models/User.js";
import Store from "./models/Store.js";

import { signup, login,signupAndCreateStore } from "./controllers/auth.controller.js";
import { getAllUsers } from "./controllers/user.controller.js";
import { addStore, getAllStores, rateStore } from "./controllers/store.controller.js";

import authMiddleware from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

connectDB();

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Welcome to the rating application...!" });
});

app.post("/signup", signup);
app.post("/login", login);


app.get("/users",authMiddleware, getAllUsers);


app.post("/store",authMiddleware,  addStore);
app.post('/signup-owner-store', signupAndCreateStore);
app.get("/stores",authMiddleware,  getAllStores);
app.put("/rate",authMiddleware,  rateStore);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});