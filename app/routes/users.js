"use strict";

import express from "express";
import {
  getUsers,
  updateUsers,
  getUserTable,
  sendMail,
  postUser,
  getEmployee,
} from "../controllers/user.controller.js";
import {
  createUsers,
  getLogins,
  login,
} from "../controllers/login.controller.js";
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
router.get("/employee/:logId", getEmployee);
router.get("/user-table", getUserTable);
router.get("/login", getLogins);
router.get("/reserves", getReserves);
router.get("/period", getPeriod);

router.post("/users", updateUsers);
router.post("/employee", postUser);
router.post("/login", login);
router.post("/register", createUsers);
router.post("/mail", sendMail);
router.post("/reserves", createReserves);

export { router };
