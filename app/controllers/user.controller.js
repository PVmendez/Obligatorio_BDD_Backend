"use strict";

import { dataTest } from "../utils/dataTest.js";

export const getUsers = (req, res) => {
  res.status(200).json(dataTest);
};

export const createUsers = (req, res) => {
  
}