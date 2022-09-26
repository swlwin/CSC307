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
/*
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
	console.log(`App listening at http://localhost:${port}`);
});*/
/* End of 2.*/

/* 4 - Getting users by name */
/*
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

const findUserByName = (name) => {
	return users['users_list'].filter((user)=>user['name'] === name);
}

app.use(express.json()); //set up express app
app.get('/users', (req, res) => {
	const name = req.query.name;
	if(name != undefined){
		let result = findUserByName(name);
		result = {users_list:result};
		res.send(result);
	}
	else{
		res.send(users);
	}
});

//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
*/
/* End of 4.*/

/* 5 - Getting users by ID*/
// : symbol to mark a variable that is part of the URL, handle the requests coming from the route.

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

// const findUserByName = (name) => {
// 	return users['users_list'].filter((user)=>user['name'] === name);
// }


app.use(express.json()); //set up express app
app.get('/users/:id', (req, res) => {
	const id = req.params['id']; // or req.params.id
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found.');
	else
	{
		result = {users_list: result};
		res.send(result);
	}
});

function findUserById(id)
{
	return users['users_list'].find((user) => user['id'] === id);
	//or 
	//return users['user_list'].filter((user) => user['id'] === id);
}


//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

/* End of 5.*/

