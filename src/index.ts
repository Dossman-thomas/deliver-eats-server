import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";

// connect to deliverEats MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to MongoDB");
});

// set up the express app
const PORT = parseInt(process.env.PORT as string, 10) || 7000;  // ensure PORT is a number
const app = express();

// add middleware to parse JSON and urlencoded request bodies
app.use(express.json());
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
