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
          Ci: user.Ci,
          Nombre: user.Nombre,
          Apellido: user.Apellido,
          Email: user.Email,
        },
        "tu_secreto_secreto",
        { expiresIn: "1h" }
      );

      res.json({ token, username: user.Nombre });
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

export const createUsers = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  conexion.query(
    `INSERT INTO Logins VALUES ('${username}', '${password}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({ message: "Usuario creado correctamente" });
    } 
  ); 
}; 
