"use strict";

import express from "express";
import { getUsers, updateUsers, getUserTable, sendMail, postUser } from "../controllers/user.controller.js";
import { createUsers, getLogins, login } from "../controllers/login.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", updateUsers);

router.post("/user", postUser);

router.get("/user-table", getUserTable);

router.get("/login", getLogins);
router.post("/login", login);
router.post("/register", createUsers); 

router.post("/mail", sendMail);

export { router }; 