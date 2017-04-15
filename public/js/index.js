	var socket = io();
		socket.on('connect', function(){
			console.log("client connected");		
		});
		
		socket.on('disconnect', function(){
			console.log('disconnected');
		});
		
		
		socket.on('newUser', function(message){
			console.log(message);
		});
	
		socket.on('connected', function(message){
			console.log(message);
		});
		
		socket.on('newMessage', function(message){
			//console.log(message);
			
			var li = jQuery('<li></li>');
			var t = message.From+": "+message.text;
			li.text(t);
			
			jQuery('#messages').append(li);
			
		});
		
		
	/*socket.emit('createMessage', {			//server->client
		From: "David",
		text: "no cookies"
	}, function(data){
		
		console.log(data);
		
	});*/
	
	
	jQuery('#message-form').on('submit', function(e){
		e.preventDefault();
		
		socket.emit('createMessage',{
			From: 'User',
			text: jQuery('[name=message]').val()
		}, function(){});
	});
	
	