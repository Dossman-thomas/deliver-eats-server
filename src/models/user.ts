import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// define the User model schema
const UserSchema = new mongoose.Schema({
    _id: ObjectId,
    auth0Id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    addressLine1: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    zipCode: {
        type: String,
    },
});

const User = mongoose.model("User", UserSchema);
export default User;