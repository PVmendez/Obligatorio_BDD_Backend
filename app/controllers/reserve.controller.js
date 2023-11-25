"use strict";

import { conexion } from "../utils/dbConnection.js";

export const getReserves = (req, res) => {
  conexion.query("SELECT * FROM Reservas", (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const createReserves = (req, res) => {
    const { date, logId } = req.body;
    const fechaOriginal = date;
    const fechaConvertida = new Date(fechaOriginal).toISOString().split('T')[0];
    conexion.query(
      `INSERT INTO Reservas VALUES ('${fechaConvertida}', '${logId}')`,
      (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({ message: "Reserva creada exitosamente" });
      } 
    );
  }; 
  
