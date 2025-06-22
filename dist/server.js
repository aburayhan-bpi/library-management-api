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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
// Configs
const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || " ",
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config.MONGO_URI);
        console.log("✅ MongoDB connected!");
        // App listening
        server = app_1.default.listen(config.PORT, () => {
            console.log(`🚀 Server running on port ${config.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error);
    }
});
main();
