"use strict";

import { conexion } from "../utils/dbConnection.js";
import nodemailer from "nodemailer";

export const postUser = (req, res) => {
  console.log(req.body);
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
  const formattedExpirationDate = new Date(ExpirationDate).toISOString().slice(0, 10);
  const formatedIssueDate = '2023-11-14';
  

  // Insert into Funcionarios table
  const query1 = `INSERT INTO Funcionarios (Ci, Nombre, Apellido, Fch_Nacimiento, Direccion, Email, Telefono) 
                  VALUES ('${Ci}', '${Name}', '${Surname}', '${formattedBirthdate}', '${Location}', '${Mail}', '${Phone}')`;

  const values1 = [Ci, Name, Surname, formattedBirthdate, Location, Mail, Phone];

  // Insert into Carnet_Salud table
  const query2 = `INSERT INTO Carnet_Salud (Ci, Fch_Emision, Fch_Vencimiento, Comprobante) 
                  VALUES ('${Ci}', '${formatedIssueDate}', '${formattedExpirationDate}', '${Receipt}')`;

    //const query2 = `SELECT * FROM Carnet_Salud;`

  const values2 = [Ci, formatedIssueDate, formattedExpirationDate, Receipt];

  // Execute the first query
  conexion.query(query1, values1, (error1, results1, fields1) => {
    if (error1) {
      throw error1;
    }

    // Execute the second query
    conexion.query(query2, values2, (error2, results2, fields2) => {
      if (error2) {
        throw error2;
      }

      res.status(200).json(results2);
    });
  });
};

export const getUsers = (req, res) => {
  conexion.query("SELECT * FROM Funcionarios", (error, results, fields) => {
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
      user: "valentino@hackmetrix.com",
      pass: "54325432AbC.",
    },
  });

  const { destinatario, mensaje } = req.body;
 
  const mailOptions = {
    from: "valentino@hackmetrix.com",
    to: destinatario,
    subject: "Recordatorio",
    text: mensaje,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error al enviar el correo");
    } else {
      console.log("Correo enviado: " + info.response);
      res.status(200).send("Correo enviado con éxito");
    }
  });
};