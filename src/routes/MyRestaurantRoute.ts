import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router(); // create a new router

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});


// NOTE: all routes in this file are prepended with /api/my/restaurant


// endpoint to get the restaurant details of the logged in user.
router.get(
  "/",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurant
);

// /api/my/restaurant endpoint to create a new restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

export default router;
