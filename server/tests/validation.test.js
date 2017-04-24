const expect = require('expect');
const {isRealString} = require('./../utils/validation');

describe('Valid tests', ()=>{
	var invalid1 = '';
	var invalid2 = '  ';
	var invalid3 = 42;
	var valid3 = '       g            '+'            d';
	var valid = 'test';
	var valid2 = '$%^&#';
	
	
	it ('should false for invalid tests', ()=>{
		expect(isRealString(invalid1)).toBe(false);
		expect(isRealString(invalid2)).toBe(false);
		expect(isRealString(invalid3)).toBe(false);
	});
	
	
	it('should return true for valid tests', ()=>{
		expect(isRealString(valid)).toBe(true);
		expect(isRealString(valid2)).toBe(true);
		expect(isRealString(valid3)).toBe(true);
		
	});
	
	
});