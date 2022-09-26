const express = require('express'); //import express module 
const app = express(); //create instance of Express 
const port = 5000; //define a port number we'll use to listen to incoming HTTP request

app.use(express.json()); //set up express app
app.get('/', (req, res) => {
	res.send('Hello World');
});

//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

