import mongoose from "mongoose";
// DATABASE CONNECTION

const DB = process.env.MONGO_URI;

export const connectDB = () => {
  mongoose
    .connect(DB)
    .then(() => {
      console.log("Database Successfully connected");
    })
    .catch((err) => console.log(err));
};
