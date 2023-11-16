"use strict";

import { conexion } from "../utils/dbConnection.js";

export const getUsers = (req, res) => {
  conexion.query("SELECT * FROM Funcionarios", (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const createUsers = (req, res) => { 
  const userCi = req.body.Ci;
  conexion.query(
    `UPDATE Funcionarios SET Actualizo = 1 WHERE Ci = ${userCi}`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({ message: 'Datos actualizados correctamente' });
    } 
  );
};
