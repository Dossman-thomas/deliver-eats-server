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
   