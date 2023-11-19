import express from 'express';
import pkg from 'body-parser';
import cors from "cors";
import { router } from './app/routes/index.js';
import morgan from 'morgan';
import { conexion } from './app/utils/dbConnection.js';
import 'dotenv/config';

var app = express();
var port = 8080;
const { urlencoded, json } = pkg;

app.set('view engine', 'ejs');

app.use(urlencoded({extended:false}));
app.use(json());
app.use(cors({
	origin              : '*',
	optionsSuccessStatus: 200,
	methods             : ['GET'],
  }));
app.use(router);
app.use(morgan('dev'));



conexion.connect((error) => {
	if (error) throw error;
	else console.log("Database running");
})
app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
});