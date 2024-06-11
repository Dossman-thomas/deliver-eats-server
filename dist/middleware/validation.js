"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMyUserRequest = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateMyUserRequest = [
    (0, express_validator_1.body)("name")
        .isString()
        .notEmpty()
        .withMessage("Name is required"),
    (0, express_validator_1.body)("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("Address Line 1 is required"),
    (0, express_validator_1.body)("city")
        .isString()
        .notEmpty()
        .withMessage("City is required"),
    (0, express_validator_1.body)("state")
        .isString()
        .notEmpty()
        .withMessage("State is required"),
    (0, express_validator_1.body)("country")
        .isString()
        .notEmpty()
        .withMessage("Country is required"),
    (0, express_validator_1.body)("zipCode")
        .isString()
        .notEmpty()
        .withMessage("Zip Code is required"),
    handleValidationErrors,
];
