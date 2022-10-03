//Linking Frontend and Backend 

const express = require('express'); //import express module 
const app = express(); //create instance of Express 
const port = 5000; //define a port number we'll use to listen to incoming HTTP request
const cors = require('cors');

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

const findUserNameJob = (name, job) => {
	return users['users_list'].filter((user)=> user['name'] === name).filter((user) => user['job'] === job);
}
const findUserByName = (name) => {
	return users['users_list'].filter((user)=>user['name'] === name);
}
const findUserByJob = (job) => {
	return users['users_list'].filter((user)=>user['job'] === job);
}

//=== APP ========================================//
app.use(cors());
app.use(express.json()); //set up express app

//GET
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

//Get users by name and by job
app.get('/users', (req,res)=>{
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined && job != undefined)
	{
		let resNJ = findUserNameJob(name, job);
		resNJ = {users_list: resNJ};
		res.send(resNJ);
	}
	else if(name != undefined)
	{
		let resN = findUserByName(name);
		resN = {users_list: resN};
		res.send(resN);
	}
	else if(job != undefined)
	{
		let resJ = findUserByJob(job);
		resJ = {users_list: resJ};
		res.send(resJ);
	}
	else
	{
		res.send(users);
	}
});

//POST new users to list of users
//Change made
app.post('/users', (req, res) => {
	const userToAdd = req.body;
	var json = {}
	userToAdd['id'] = generateID();
	addUser(userToAdd);
	json['id'] = userToAdd['id'];
	json['name'] = userToAdd['name'];
	json['job'] = userToAdd['job'];
	res.status(201).send(json).end();
});

//Delete user using their id
app.delete('/users/:id', (req,res)=>
{
	const id = req.params['id'];
	let delRes = deleteUser(id);
	if(delRes === undefined || delRes.length === 0)
		res.status(404).send('User to be deleted not found');
	else 
	{
		res.status(204).end();
	}
});

//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
//==============================================================//

//=== FUNCTIONS ===================================//
function generateID()
{
	id = '';
	character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
	charLength = character.length;
	length = 6;
	
	do{
		for(i = 0; i < length; i++)
		{
			id += character.charAt(Math.floor(Math.random()*charLength))
		}
	}while(users.users_list.filter(user => user.id == id).length>0); //all id is unique
	
	return id;
}

function findUserById(id)
{
	return users['users_list'].find((user) => user['id'] === id);
}

function addUser(user){
	users['users_list'].push(user);
}

function deleteUser(id)
{
	return users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
}
//====================================================//
