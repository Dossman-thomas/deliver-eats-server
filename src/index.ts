// This is the main file for our Express server. It sets up the server, connects to MongoDB, and defines the routes. We also configure Cloudinary here. 
import express, { Request, Response } from "express"; // import express and the Request and Response types
import cors from "cors"; // import cors
import "dotenv/config"; // import dotenv to load environment variables from the .env file
import mongoose from "mongoose"; // import mongoose to connect to MongoDB
import { v2 as cloudinary } from "cloudinary"; // import cloudinary to upload images
import myUserRoute from "./routes/MyUserRoute"; // import the myUserRoute
import myRestaurantRoute from "./routes/MyRestaurantRoute"; // import the myRestaurantRoute
import restaurantRoute from "./routes/RestaurantRoute"; // import the restaurantRoute


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

// define routes
app.use("/api/my/user", myUserRoute); // use the myUserRoute for the /api/my/user endpoint
app.use("/api/my/restaurant", myRestaurantRoute); // use the myRestaurantRoute for the /api/my/restaurant endpoint
app.use("/api/restaurant", restaurantRoute); // use the myRestaurantRoute for the /api/restaurant endpoint


// start the Express server
app.listen(PORT, () => {
  console.log(`API server running on port http://localhost:${PORT}`);
});
