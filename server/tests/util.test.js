var expect = require('expect');

var{generateMessage, generateLocationMessage} = require('./../utils/messaging.js');


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
});


describe('generateLocationMessage', ()=>{
	var From = "David";
	var latitude = "25.2048493";
	var longitude = "55.2707828";
	var theUrl = "https://www.google.com/maps?q="+latitude+","+longitude;
	var validUrl = "https://www.google.com/maps?q=";
	
	var result = generateLocationMessage(From, latitude, longitude);
	
	it('should have the necessary fields in the object', ()=>{
		expect(result).toInclude({From:From, url:theUrl});
		expect(result.url).toBe(theUrl);
		expect(result.createdAt).toBeA('number');
	});
	
	
	it('should be from David', ()=>{
		expect(result.From).toBe(From);
		expect(result.From).toBeA('string');
	});
	
	
	it('should have a valid url',()=>{
		var temp = theUrl.substring(0, 30);

		expect(theUrl.search("https")).toBe(0);
		expect(theUrl.search("25")).toBe(30);
	});
	
});