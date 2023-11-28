"use strict";

import { conexion } from "../utils/dbConnection.js";

export const getReserves = (req, res) => {
  conexion.query("SELECT * FROM Agenda", (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const createReserves = (req, res) => {
  const { date, ci } = req.body;
  const fechaOriginal = date;
  const fechaConvertida = new Date(fechaOriginal).toISOString().split("T")[0];

  const orderNumber = 0;

  conexion.query("SELECT * FROM Agenda", (error, results, fields) => {
    if (error) throw error;
    orderNumber = results[0];
    console.log(orderNumber);
  });

  conexion.query(
    `INSERT INTO Agenda VALUES ('${fechaConvertida}', '${ci}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({ message: "Reserva creada exitosamente" });
    } 
  );
};

export const getPeriod = (req, res) => {
    conexion.query("SELECT * FROM Periodos_Actualizacion", (error, results, fields) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  };