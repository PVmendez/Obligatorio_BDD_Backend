import mysql from 'mysql';

console.log(process.env.APP_PORT)

export const conexion = mysql.createConnection ({
	host: process.env.SERVER_HOST,
	user: process.env.SERVER_USER,
	password: process.env.SERVER_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DATABASE
});