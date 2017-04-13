	var socket = io();
		socket.on('connect', function(){
			console.log("client connected");	
			
			
			socket.emit('newMessage', {			//server->client
				From: "David",
				text: "no cookies",
				createdAt: new Date()
			});
			
			
		});
		
		socket.on('disconnect', function(){
			console.log('disconnected');
		});
		
		
		
	
		
		socket.on('newMessage', function(message){
			console.log(message);
		});