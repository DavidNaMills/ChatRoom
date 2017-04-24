const expect = require('expect');

const {Users} = require('./../utils/users');

describe('Users', ()=>{
	var users;	
	
	beforeEach(()=>{
		users = new Users();
		users.users = [{
			id: '1',
			name: 'david',
			room: 'livingroom'
		},
		{
			id: '2',
			name: 'shang na',
			room: 'bathroom'
		},
		{
			id: '3',
			name: 'michaela',
			room: 'livingroom'
		}
		];
	});
	
	
	it('should add a new user', ()=>{
		var users = new Users();
		var user = {
			id: '123',
			name: 'david',
			room: 'test'
		};
		
		users.addUser(user.id, user.name, user.room);
		
		expect(users.users).toEqual([user]);		
	});
	
	
	it('should return all users in the room', ()=>{
		expect(users.getUserList('livingroom')).toEqual(['david', 'michaela']);
		expect(users.getUserList('bathroom')).toEqual(['shang na']);
	});
	
	
	it('should remove a user', ()=>{
		var id = '1';
		var x = users.removeUser(id);
		expect(x.id).toBe(id);
		expect(users.users.length).toBe(2);
		expect(users).toInclude({
			id: '2',
			name: 'shang na',
			room: 'bathroom'
		});
		
		/*expect(users).toNotInclude({
			id: '2',
			name: 'david',
			room: 'livingroom'
		});*/
	});
	
	
	it('should not remove a user', ()=>{
		var id = '99';
		var user = users.removeUser(id);
		expect(users.users.length).toBe(3);
		expect(user).toNotExist();
	});
	
	
	
	it('should find a user', ()=>{
		var userID = '3';
		var user = users.getUser(userID);
		
		expect(user.id).toBe(userID);
	});
	
	
	it('should not find a user', ()=>{
		var userID = '99';
		var user = users.getUser(userID);
		expect(user).toNotExist();
	});
	
});