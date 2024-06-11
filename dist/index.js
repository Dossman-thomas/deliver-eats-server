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
// import necessary dependencies
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const MyUserRoute_1 = __importDefault(require("./routes/MyUserRoute"));
// connect to deliverEats MongoDB
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to MongoDB");
});
// set up the express app
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
// add middleware to parse JSON and urlencoded request bodies
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// add a "health" endpoint to check if the server is running properly. This is useful for monitoring and alerting purposes.
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "health okay!" });
}));
// define a route handler for the user page
app.use("/api/my/user", MyUserRoute_1.default);
// start the Express server
app.listen(PORT, () => {
    console.log(`API server running on port http://localhost:${PORT}`);
});
