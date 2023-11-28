"use strict";

import { conexion } from "../utils/dbConnection.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { logId, password } = req.body;

  const query = `
  SELECT *
  FROM Logins
  WHERE LogId = '${logId}';
`;

  conexion.query(query, [logId], (error, results, fields) => {
    if (error) throw error;
    const user = results[0];
    if (user.Password && user.Password === password) {
      const token = jwt.sign( 
        {
          "UserInfo": {
            "username": user.LogId,
            "roles": user.Roles
          }
        },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, username: user.LogId, roles: user.Roles });
    } else {
      res.status(403).json({ message: "No existen usuarios con ese nombre" });
    }
  });
};

export const getLogins = (req, res) => {
  conexion.query("SELECT * FROM Logins", (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const getUser= (req, res) => {
  const { logId } = req.params;
  conexion.query(`SELECT * FROM Logins WHERE LogId = '${logId}'`, (error, results, fields) => {
    if (error) throw error;
    console.log(results[0])
    res.status(200).json(results[0]);
  });
};

export const createUsers = (req, res) => {
  const { username, password } = req.body;
  conexion.query(
    `INSERT INTO Logins VALUES ('${username}', '${password}', ${[2001]})`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({ message: "Usuario creado correctamente" });
    }
  ); 
}; 
