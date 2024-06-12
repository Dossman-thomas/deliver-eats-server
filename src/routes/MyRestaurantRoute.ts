import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";

const router = express.Router(); // create a new router

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});

// /api/my/restaurant endpoint
router.post(
  "/",
  upload.single("imageFile"),
  MyRestaurantController.createMyRestaurant
);

export default router;
