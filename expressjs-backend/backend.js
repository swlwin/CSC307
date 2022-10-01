/* 7 - Using the POST method*/
// delete user 

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

function findUserById(id)
{
	return users['users_list'].find((user) => user['id'] === id);
	//or 
	//return users['user_list'].filter((user) => user['id'] === id);
}

//POST new users to list of users
app.post('/users', (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	res.status(200).end();
});

function addUser(user){
	users['users_list'].push(user);
}

//Delete user using their id
app.delete('/users/:id', (req,res)=>
{
	const id = req.params['id'];
	let delRes = deleteUser(id);
	if(delRes === undefined || delRes.length == 0)
		res.status(404).send('User to be deleted not found');
	else 
	{
		res.status(200).end();
	}
});

function deleteUser(id)
{
	return users['users_list'] = users['users_list'].filter((user) => user['id'] !== id);
}

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



const findUserNameJob = (name, job) => {
	return users['users_list'].filter((user)=> user['name'] === name).filter((user) => user['job'] === job);
}
const findUserByName = (name) => {
	return users['users_list'].filter((user)=>user['name'] === name);
}
const findUserByJob = (job) => {
	return users['users_list'].filter((user)=>user['job'] === job);
}
	
//make backend server to listen to incoming http requests 
app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

/* End of 7.*/
