# Obligatorio_BDD_Backend

# Script Base de Datos

CREATE TABLE Logins (
    LogId INT PRIMARY KEY,
    Password VARCHAR(30)
);

CREATE TABLE Funcionarios (
    Ci INT PRIMARY KEY,
    Nombre VARCHAR(30),
    Apellido VARCHAR(30),
    Fch_Nacimiento DATE,
    Direccion VARCHAR(30),
    Telefono VARCHAR(20),
    Email VARCHAR(256),
    LogId INT,
    FOREIGN KEY (LogId) REFERENCES Logins(LogId)
);

CREATE TABLE Agenda (
    Nro INT,
    Ci INT,
    Fch_Agenda DATE
);

CREATE TABLE Carnet_Salud (
    Ci INT,
    Fch_Emision DATE,
    Fch_Vencimiento DATE,
    Comprobante VARCHAR(50)
);

CREATE TABLE Periodos_Actualizacion (
    Ano INT,
    Semestre INT,
    Fch_Inicio DATE,
    Fch_Fin DATE
);