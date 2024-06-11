import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";


const router = express.Router();

// /api/my/user

router.get(
    "/",
    jwtCheck, 
    jwtParse, 
    MyUserController.getCurrentUser
); 


router.post( // API endpoint to create a new user from the auth0 data
    "/", 
    jwtCheck, 
    MyUserController.createCurrentUser
);

router.put( // API endpoint to update a user 
    "/", 
    jwtCheck, 
    jwtParse, 
    validateMyUserRequest, 
    MyUserController.updateCurrentUser
);



export default router;

