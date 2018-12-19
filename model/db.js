const mongoose  = require('mongoose');
let connectionURI;

switch(process.env.NODE_ENV) {
  case ('test') :
  case ('dev')  :
    const dotenv = require('dotenv');
	dotenv.config();
	connectionURI = process.env.MLAB_URI;
	mongoose.connect(process.env.MLAB_URI);
    break;
  default       :
	// DB_URI, DB_UN, DB_PASS should be passed as command line arguments if not in test or dev mode
	connectionURI = process.env.DB_URI;
	mongoose.connect(process.env.DB_URI, {user: process.env.DB_U, pass: process.env.DB_P});
}
console.log(`Mongoose attempt to connect to ${connectionURI} ...`);

// CONNECTION EVENTS

//// SUCCESS
mongoose.connection.on('connected', () =>
{
	console.log(`Mongoose connection open to ${connectionURI}`);
});

//// ERROR
mongoose.connection.on('error', (err) =>
{
	console.log('Mongoose connection error: ' + err);
});

//// DISCONNECT
mongoose.connection.on('disconnected', () =>
{
	console.log('Mongoose disconnected.');
});

//// NODE PROCESS END
process.on('SIGINT' , () =>
{	
	mongoose.connection.close(()=> 
	{
		console.log('Mongoose disconnected through app termination.');
		process.exit(0);
	});
});

// SCHEMAS AND MODELS
const Issue = require('./issue');
const Project = require('./project');

module.exports = {Issue, Project};