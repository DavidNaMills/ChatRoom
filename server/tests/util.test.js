var expect = require('expect');

var{generateMessage} = require('./../utils/messaging.js');


describe('generateMessage test', ()=>{
	//store res in variable
	//assert ffrom match
	//assert text match
	//assert createdAt is number
	
	it('should generate a message', ()=>{
		var test1 = "David Mills";
		var test2 = "its time for whisky!!!";
		
		var result = generateMessage(test1, test2);
		
		expect(result).toInclude({From:test1, text:test2});
		expect(result.createdAt).toNotBe(undefined);
		expect(result.From).toBe(test1);
		expect(result.text).toBe(test2);
		expect(result.text).toNotBe(test1);
		expect(result.createdAt).toBeA('number');
	});
	
	it('should return the proper message')
	
});