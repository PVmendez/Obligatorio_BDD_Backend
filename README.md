# Obligatorio_BDD_Backend

# Ejecución:
Instalar dependencias:

npm install

Ejecutar:

nodemon

Alternativa en caso de error:

node -r dotenv/config app.js

# Base de Datos

Optamos por agregar dos nuevas columnas, Roles y Actualizo, a las tablas Logins y Funcionarios respectivamente.
La columna Roles almacena los datos de los tipos de usuarios en forma de entero, ya sea Admin (5150) y usuario normal (2001). Decidimos hacerlo con enteros y no booleans por si a futuro decidimos agregar nuevos Roles.
La finalidad de Actualizo es agregar un tipo de valor booleano el cual está relacionado a cada usuario y especifica si el mismo ya actualizó su información sobre su carnet de salud. Encontramos necesario tener este tipo de información sobre cada usuario.

# Script Base de Datos

CREATE TABLE Logins (
    LogId INT PRIMARY KEY,
    Password VARCHAR(30),
    Roles JSON
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
    FOREIGN KEY (LogId) REFERENCES Logins(LogId),
    Actualizo BOOL
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