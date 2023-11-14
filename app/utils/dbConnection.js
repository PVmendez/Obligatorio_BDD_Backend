import mysql from 'mysql';

export const conexion = mysql.createConnection ({
	host: 'burqmmbomj1nmp4a7xce-mysql.services.clever-cloud.com',
	user: 'u4vgtbejqvsjt5uh',
	password: 'nDdjoPc45tze8OCvE03a',
	port: 3306,
	database: 'burqmmbomj1nmp4a7xce'
});