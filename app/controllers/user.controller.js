"use strict";

import { conexion } from "../utils/dbConnection.js";
import nodemailer from "nodemailer";

export const getUsers = (req, res) => {
  conexion.query("SELECT * FROM Funcionarios", (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const getEmployee = (req, res) => {
  const { logId } = req.params;
  conexion.query(`SELECT * FROM Funcionarios WHERE LogId = '${logId}'`, (error, results, fields) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

export const getUserTable = (req, res) => {
  conexion.query(
    "SELECT F.CI, F.Nombre, F.Apellido, F.Email, CASE WHEN CS.Fch_Emision IS NOT NULL THEN 'Sí' ELSE 'No' END AS Tiene_Carnet, CASE WHEN CS.Fch_Vencimiento < CURDATE() THEN 'Sí' ELSE 'No' END AS Carnet_Vencido FROM Funcionarios F LEFT JOIN Carnet_Salud CS ON F.CI = CS.CI WHERE F.Actualizo = 0;",
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json(results);
    }
  );
};

export const updateUsers = (req, res) => {
  const userCi = req.body.Ci;
  conexion.query(
    `UPDATE Funcionarios SET Actualizo = 1 WHERE Ci = ${userCi}`,
    (error, results, fields) => {
      if (error) throw error;
      res.status(200).json({ message: "Datos actualizados correctamente" });
    }
  );
};

export const sendMail = (req, res) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const { destinatario, mensaje } = req.body;

  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: destinatario,
    subject: "Recordatorio",
    text: mensaje,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al enviar el correo");
    } else res.status(200).send("Correo enviado con éxito");
  });
};

export const postUser = (req, res) => {
  const {
    Ci,
    Name,
    Surname,
    Birthdate,
    Location,
    Mail,
    Phone,
    IssueDate,
    ExpirationDate,
    Receipt,
  } = req.body;

  const formattedBirthdate = new Date(Birthdate).toISOString().slice(0, 10);
  const formattedExpirationDate = new Date(ExpirationDate)
    .toISOString()
    .slice(0, 10);
  const formatedIssueDate = new Date(IssueDate).toISOString().slice(0, 10);

  const query1 = `INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Email, Telefono) 
                  VALUES ('${Ci}', '${Name}', '${Surname}', '${formattedBirthdate}', '${Location}', '${Mail}', '${Phone}')`;

  const values1 = [
    Ci,
    Name,
    Surname,
    formattedBirthdate,
    Location,
    Mail,
    Phone,
  ];

  const query2 = `INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) 
                  VALUES ('${Ci}', '${formatedIssueDate}', '${formattedExpirationDate}', '${Receipt}')`;

  const values2 = [Ci, formatedIssueDate, formattedExpirationDate, Receipt];

  conexion.query(query1, values1, (error1, results1, fields1) => {
    if (error1) {
      throw error1;
    }

    conexion.query(query2, values2, (error2, results2, fields2) => {
      if (error2) {
        throw error2;
      }

      res.status(200).json(results2);
    });
  });
};
