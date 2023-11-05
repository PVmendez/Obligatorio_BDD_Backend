"use strict";

import express from "express";
import { router as userRouter } from "./users.js";

const router = express.Router();

router.use(userRouter);

export { router };