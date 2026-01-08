
import express from "express";
import { NextFunction } from "express";
import { Response, Request } from "express";
let router = express.Router();

import { AuthRouter } from "src/router/auth";
router.use("/auth", AuthRouter);


import { FriendRouter } from "src/router/friend";
router.use("/friend", FriendRouter);


router.use((req: Request, res: Response, next: NextFunction) => {
    next(res.status(404).json({ status: false, message: "Not Found." }));
});

export { router as mainRouter };