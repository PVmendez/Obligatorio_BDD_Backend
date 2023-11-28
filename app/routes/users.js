"use strict";

import express from "express";
import { getUsers, updateUsers, getUserTable, sendMail, postUser, getEmployee, getEmployeeUpdated } from "../controllers/user.controller.js";
import { createUsers, getLogins, getUser, login } from "../controllers/login.controller.js";
import ROLES_LIST from "../config/roles_list.js";
import verifyRoles from "../middleware/verifyRoles.js";
import { verifyToken } from "../middleware/tokenVerify.js";
import {
  createReserves,
  getPeriod,
  getReserves,
} from "../controllers/reserve.controller.js";

const router = express.Router();

router.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/register" || req.path === "/mail")
    next();
  else {
    if (verifyToken(req, res, next)) next();
    else res.status(401).send("Error en la verificación del token");
  }
});

router.get("/users", getUsers);
router.get("/user/:logId", getUser);  
router.get("/employee/:logId", getEmployee);
router.get("/employee-updated/:logId", getEmployeeUpdated)
router.get("/user-table", getUserTable);
router.get("/login", getLogins);
router.get("/reserves", getReserves);
router.get("/period", getPeriod);

router.post("/users",verifyRoles(ROLES_LIST.Admin), updateUsers);
router.post("/employee",verifyRoles(ROLES_LIST.Admin), postUser);
router.post("/login", login);
router.post("/register", createUsers);
router.post("/mail", sendMail);
router.post("/reserves", createReserves);

export { router };
