const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3001;
var {generateMessage, generateLocationMessage} = require('./utils/messaging.js');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

//const 

io.on('connection', (socket)=>{
	//console.log("new user connected");
	
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));
	
	
	
	socket.on('disconnect',()=>{
		//console.log("user disconnected");	
		socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has left'));
	});
	
	
	
	socket.on('createMessage', (message, callback)=>{
		io.emit('newMessage', generateMessage(message.From, message.text));
		callback('this is from the server');
	});	
	
	
	
	socket.on('createLocationMessage', (coords)=>{
		socket.broadcast.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});
	
	
});

app.use(express.static(publicPath));






server.listen(PORT, ()=>{
	console.log(publicPath+"/listening on "+PORT);
});