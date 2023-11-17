"use strict";

import express from "express";
import { getUsers, createUsers, postUser } from "../controllers/user.controller.js";
import { login } from "../controllers/login.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUsers);

router.post("/user", postUser);

router.post("/login", login);

export { router };