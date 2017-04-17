const moment = require('moment');

var generateMessage = (From, text)=>{
	
	return{
		From:From,
		text:text,
		createdAt: moment().valueOf()
	};
	
};



var generateLocationMessage = (From, latitude, longitude)=>{
	
	return{
		From:From,
		url:'https://www.google.com/maps?q='+latitude+","+longitude,
		createdAt: moment().valueOf()
	};
	
};


module.exports={
	generateMessage,
	generateLocationMessage
}