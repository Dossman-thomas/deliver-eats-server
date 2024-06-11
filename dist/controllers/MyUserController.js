"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user")); // Import the User model
// Function to get current user based on mongoDB _id 
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentUser = yield user_1.default.findOne({ _id: req.userId });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(currentUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Function to create a new user or return an existing user based on the provided auth0Id
const createCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body; // Extract auth0Id from the request body
        const existingUser = yield user_1.default.findOne({ auth0Id }); // Check if a user with this auth0Id already exists
        // If user already exists, return the user with status 200
        if (existingUser) {
            return res.status(200).json(existingUser).send();
        }
        // If the user does not exist, create a new user
        const newUser = new user_1.default(req.body); // Create a new User instance with the request body data
        yield newUser.save(); // Save the new user to the database
        // Return the newly created user object with status 201
        res.status(201).json(newUser.toObject()); // Status code 201 indicates the creation of a new resource
    }
    catch (error) {
        console.log(error); // Log any errors that occur
        // Return a 500 status with an error message if there's an issue creating the user
        res.status(500).json({ error: "Error creating user" });
    }
});
// Function to update the current user's information
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, city, state, country, zipCode, } = req.body; // Extract user details from the request body
        const user = yield user_1.default.findById(req.userId); // Find the user by ID (assuming req.userId is set)
        // If the user is not found, return a 404 status with a message
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Update the user's information with the new data from the request body
        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.state = state;
        user.country = country;
        user.zipCode = zipCode;
        yield user.save(); // Save the updated user information
        // Return the updated user object
        res.send(user);
    }
    catch (error) {
        console.log(error); // Log any errors that occur
        // Return a 500 status with an error message if there's an issue updating the user
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.default = {
    getCurrentUser, // Export the getCurrentUser function
    createCurrentUser, // Export the createCurrentUser function
    updateCurrentUser, // Export the updateCurrentUser function
};
