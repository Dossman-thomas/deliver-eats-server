import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    next(); 

};

export const validateMyUserRequest = [
    body("name")
        .isString()
        .notEmpty()
        .withMessage("Name is required"),
    body("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("Address Line 1 is required"),
    body("city")
        .isString()
        .notEmpty()
        .withMessage("City is required"),
    body("state")
        .isString()
        .notEmpty()
        .withMessage("State is required"),
    body("country")
        .isString()
        .notEmpty()
        .withMessage("Country is required"),
    body("zipCode")
        .isString()
        .notEmpty()
        .withMessage("Zip Code is required"),
    handleValidationErrors,
];


export const validateMyRestaurantRequest = [
   body("restaurantName")
        .notEmpty()
        .withMessage("Restaurant Name is required"),
    body("city")
        .notEmpty()
        .withMessage("City is required"),
    body("country")
        .notEmpty()
        .withMessage("Country is required"),
    body("deliveryPrice")
        .isFloat({ min: 0 })
        .withMessage("Delivery Price must be a positive number"),
    body("estimatedDeliveryTime")
        .isInt({ min: 0 })
        .withMessage("Estimated Delivery Time must be a positive integer"),
    body("cuisines")
        .isArray()
        .withMessage("At least one cuisine is required")
        .not()
        .isEmpty()
        .withMessage("Cuisines array cannot be empty"),
    body("menuItems")
        .isArray()
        .withMessage("At least one menu item is required"),
    body("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu Item Name is required"),
    body("menuItems.*.price")
        .isFloat({ min: 0 })
        .withMessage("Menu item price is required and must be a positive number"),
    handleValidationErrors,
];