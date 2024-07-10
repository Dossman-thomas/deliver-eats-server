import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// /api/restaurant/search/london => search for restaurants in london

router.get(
  "/search/:city",
  param("city").isString().trim().notEmpty().withMessage("City is required"), // validating the city parameter
  RestaurantController.searchRestaurants
);
