import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";


// connect to deliverEats MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// set up the express app
const PORT = parseInt(process.env.PORT as string, 10) || 7000;  // ensure PORT is a number
const app = express();

// add middleware to parse the request body, so we can access req.body in our route handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// add a "health" endpoint to check if the server is running properly. This is useful for monitoring and alerting purposes.
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health okay!" });
});

// define a route handler for the user page
app.use("/api/my/user", myUserRoute);


// start the Express server
app.listen(PORT, () => {
  console.log(`API server running on port http://localhost:${PORT}`);
});
