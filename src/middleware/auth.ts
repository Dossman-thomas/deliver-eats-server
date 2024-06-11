import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global { // declare custom global Express namespace properties
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

// Middleware to check if the request contains a valid JWT token. This function comes from the oauth package that connects to the auth0 service based on the credentials provided in when a user creates their account. It validates that the jwt token we get from the request is valid and that it was signed by the auth0 service.
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

// Middleware to parse the JWT token and extract user information from it. 
export const jwtParse = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {

    return res.sendStatus(401);

  } 

  const token = authorization.split(" ")[1];

  if (!token) {

    return res.sendStatus(401);

  }

  try {

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const auth0Id = decoded.sub; // .sub is a convention in auth0 that holds the auth0Id for that user

    const user = await User.findOne({ auth0Id });

    if (!user) {

      return res.sendStatus(401);

    }

    // append information about the user to the request object
    req.auth0Id = auth0Id as string;
    
    if(user._id){
      req.userId = user._id.toString();
    }

    next(); // call the next middleware, or controller handler
    
  } catch (error) {
    
    return res.sendStatus(401);

  }


};