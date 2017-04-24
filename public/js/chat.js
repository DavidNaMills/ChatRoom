	var socket = io();
	socket.on('connect', function(){
		var params = jQuery.deparam(window.location.search);

		socket.emit('join', params, function(err){
			if(err){
				alert(err);
				window.location.href='/';
			}
			else{
				console.log("welcome");
			}
		});
	});
		
		
		
		socket.on('disconnect', function(){
			console.log('disconnected');
		});
		
		
		socket.on('updateUserList', function(users){
			var ol = jQuery('<ol></ol>');
			
			users.forEach(function(user){
				ol.append(jQuery('<li></li>').text(user));
			});
			
			jQuery('#users').html(ol);			
		});
		
		
		
		
		socket.on('newUser', function(message){
			console.log(message);
		});
	
	
	
	
		socket.on('connected', function(message){
			console.log(message);
		});
		
		
		
	function scrollToBottom () {
	var messages = jQuery('#messages');
		var newMessage = jQuery(messages.children('li:last-child'));
		
		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();
		
		
		if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
			messages.scrollTop(scrollHeight);
		}
	}
	
		
		
		
		socket.on('newMessage', function(message){
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = jQuery('#messageTemplate').html();
			var html = Mustache.render(template, {
				From: message.From,
				text: message.text,
				createdAt: formattedTime
			});
			
			jQuery('#messages').append(html);
			scrollToBottom();
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
			scrollToBottom();
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
	
	