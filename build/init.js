"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
exports.mainRouter = router;
const auth_1 = require("src/router/auth");
router.use("/auth", auth_1.AuthRouter);
const friend_1 = require("src/router/friend");
router.use("/friend", friend_1.FriendRouter);
router.use((req, res, next) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});
