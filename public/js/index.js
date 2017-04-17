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
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = jQuery('#messageTemplate').html();
			var html = Mustache.render(template, {
				From: message.From,
				text: message.text,
				createdAt: formattedTime
			});
			
			jQuery('#messages').append(html);
		});
		
	

		socket.on('newLocationMessage', function(message){
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = jQuery('#locationMessageTemplate').html();
			var html = Mustache.render(template, {
				From: message.From,
				url: message.url,
				createdAt: formattedTime
			});
			
			jQuery('#messages').append(html);
		});

	
	
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
	
	