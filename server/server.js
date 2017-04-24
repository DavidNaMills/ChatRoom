const path = require ('path');
const publicPath = path.join(__dirname, '../public');
const http = require ('http');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const PORT = process.env.PORT || 3001;
var {generateMessage, generateLocationMessage} = require('./utils/messaging.js');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);


var users = new Users();

io.on('connection', (socket)=>{
	
	socket.on('disconnect',()=>{
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));		//update the list
			io.to(user.room).emit('newMessage', generateMessage('Admin', user.name+' has left'));		//send message
		}
	});
	
	
	
	socket.on('join', (params, callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and Room name are required');
		}
		
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));	// 
		
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app!'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name+' has joined'));
		
		
		//io.to(params.room).emit
		//socket.broadcast.to(params.rooms).emit
		//
		
		
		callback();
	});
	
	
	
	
	socket.on('createMessage', (message, callback)=>{
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));			
		}
		

		callback('this is from the server');
	});	
	
	
	
	socket.on('createLocationMessage', (coords)=>{
		var user = users.getUser(socket.id);
		
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
		
	});
	
	
});

app.use(express.static(publicPath));






server.listen(PORT, ()=>{
	console.log(publicPath+"/listening on "+PORT);
});