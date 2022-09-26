/* 1 - Creating Hello World
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
*/

/* 2 - Beyond the "/" route */

const express = require('express'); //import express module 
const app = express(); //create instance of Express 
const port = 5000; //define a port number we'll use to listen to incoming HTTP request

const users = {
	users_list : 
	[
		{
			id: 'xyz789',
			name : 'Charlie',
			job: 'Janitor',
		},
		{
			id : 'abc123', 
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			id : 'ppp222', 
			name: 'Mac',
			job: 'Professor',
		}, 
		{
			id: 'yat999', 
			name: 'Dee',
			job: 'Aspring actress',
		},
		{
			id: 'zap555', 
			name: 'Dennis',
			job: 'Bartender',
		}
	]
}

app.use(express.json()); //set up express app
app.get('/users', (req, res) => {
	res.send(users);
});

//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
/* End of 2.*/