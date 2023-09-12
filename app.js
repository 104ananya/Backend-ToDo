import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { erroMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  // path: __dirname + "/.env",
  path: "./data/config.env",
});

// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// using ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// error handling in node.js
app.use(erroMiddleware);
