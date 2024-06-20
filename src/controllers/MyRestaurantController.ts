import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId }); // find the restaurant with the user ID of the authenticated user

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" }); // 404 is the status code for not found
    }

    res.status(200).json(restaurant); // 200 is the status code for OK
  } catch (error) {
    console.log("Error: ", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching restaurant" });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ message: "Restaurant already exists" }); // 409 is the status code for conflict/already exists
    }

    const image = req.file as Express.Multer.File; // req.file is the image file uploaded by the user
    const base64Image = Buffer.from(image.buffer).toString("base64"); // convert the image buffer to a base64 string
    const dataURI = `data:${image.mimetype};base64,${base64Image}`; // create a data URI from the base64 string

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI); // upload the image to Cloudinary

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = uploadResponse.url; // set the imageUrl to the URL of the uploaded image
    restaurant.user = new mongoose.Types.ObjectId(req.userId); // set the user field to the ID of the authenticated user
    restaurant.lastUpdated = new Date(); // set the lastUpdated field to the current date and time

    await restaurant.save(); // save the restaurant to the database

    res.status(201).send(restaurant); // 201 is the status code for created
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" }); // 500 is the status code for internal server error
  }
};

export default {
  getMyRestaurant,
  createMyRestaurant,
};
