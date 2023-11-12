import express from 'express';
import pkg from 'body-parser';
import { router } from './app/routes/index.js';

var app = express();
var port = 8080;
const { urlencoded, json } = pkg;

app.use(urlencoded({extended:false}));
app.use(json());
app.use(router);

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
});