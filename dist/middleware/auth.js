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
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// Middleware to check if the request contains a valid JWT token. This function comes from the oauth package that connects to the auth0 service based on the credentials provided in when a user creates their account. It validates that the jwt token we get from the request is valid and that it was signed by the auth0 service.
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});
// Middleware to parse the JWT token and extract user information from it. 
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.sendStatus(401);
    }
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const auth0Id = decoded.sub; // .sub is a convention in auth0 that holds the auth0Id for that user
        const user = yield user_1.default.findOne({ auth0Id });
        if (!user) {
            return res.sendStatus(401);
        }
        // append information about the user to the request object
        req.auth0Id = auth0Id;
        if (user._id) {
            req.userId = user._id.toString();
        }
        next(); // call the next middleware, or controller handler
    }
    catch (error) {
        return res.sendStatus(401);
    }
});
exports.jwtParse = jwtParse;
