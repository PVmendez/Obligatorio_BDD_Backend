"use strict";

import { conexion } from "../utils/dbConnection.js";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { logId, password } = req.body;

  console.log(req.body)

  const query = `
  SELECT f.Ci, f.Nombre, f.Apellido, f.Email, l.Password
  FROM Funcionarios f
  JOIN Logins l ON f.LogId = l.LogId
  WHERE f.logId = ${logId};
`; 

  conexion.query(query, [logId], (error, results, fields) => {
    if (error) throw error;
    const user = results[0];
    console.log(results); 
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
      res.status(403).json({ message: "No existen usuarios con ese logId" });
    }
  });
};
