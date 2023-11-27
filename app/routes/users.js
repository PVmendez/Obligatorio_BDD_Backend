"use strict";

import express from "express";
import { getUsers, updateUsers, getUserTable, sendMail, postUser } from "../controllers/user.controller.js";
import { createUsers, getLogins, login } from "../controllers/login.controller.js";
import ROLES_LIST from "../config/roles_list.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users",verifyRoles(ROLES_LIST.Admin), updateUsers);
router.post("/employee",verifyRoles(ROLES_LIST.Admin), postUser);

router.get("/user-table", getUserTable);

router.get("/login", getLogins);
router.post("/login", login);
router.post("/register", createUsers); 

router.post("/mail", sendMail);

export { router };