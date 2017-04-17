var generateMessage = (From, text)=>{
	
	return{
		From:From,
		text:text,
		createdAt: new Date().getTime()
	};
	
};



var generateLocationMessage = (From, latitude, longitude)=>{
	
	return{
		From:From,
		url:'https://www.google.com/maps?q='+latitude+","+longitude,
		createdAt: new Date().getTime()
	};
	
};


module.exports={
	generateMessage,
	generateLocationMessage
}