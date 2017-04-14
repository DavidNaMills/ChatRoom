var generateMessage = (From, text)=>{
	
	return{
		From:From,
		text:text,
		createdAt: new Date().getTime()
	};
	
};

module.exports={
	generateMessage
}