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
		
	

		socket.on('newLocationMessage', function(message){
			console.log(message.url);
			var li = jQuery('<li></li>');
			var a = jQuery('<a target="_blank">My current location</a>');
			
			var t = message.From+": ";
			li.text(t);
			a.attr('href', message.url);
			
			li.append(a);
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
		
		var name = jQuery('[name=message]');
		
		socket.emit('createMessage',{
			From: 'User',
			text: name.val()
		}, function(){
			name.val('');
		});
	});
	
	
	var locationButton = 	jQuery('#sendLocation');
	
	locationButton.on('click', function(){
		console.log('location clicked');
		
		if(!navigator.geolocation){
			return alert("Geolocation not supported by this browser");
		}
		
		locationButton.attr('disabled', 'disabled').text('Sending location...');
		
		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled').text('Send location');
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
			
			
		}, function(){
			alert("unable to fetch location");
			locationButton.removeAttr('disabled').text('Send location');
		});
	});
	
	