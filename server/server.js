const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3001;
var {generateMessage} = require('./utils/messaging.js');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

//const 

io.on('connection', (socket)=>{
	console.log("new user connected");
	
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));
	
	
	
	socket.on('disconnect',()=>{
		console.log("user disconnected");	
	});
	

	
	var From;
	var text;
	var createdAt;
	
	
	socket.on('createMessage', (message, callback)=>{
		console.log('in createMessage');
		io.emit('newMessage', generateMessage(message.From, message.text));
		callback('this is from the server');
	});	
	
});

app.use(express.static(publicPath));






server.listen(PORT, ()=>{
	console.log(publicPath+"/listening on "+PORT);
});