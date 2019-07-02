import AuthService from './AuthService';

describe("AuthService static methods", () => {

	describe("isTokenValid", () => {
		it("should return false if token is null", () => {
			AuthService.setToken(null);
			expect(AuthService.isTokenValid()).toBe(false);
		});
		
		it("should return true if token is not null", () => {
			AuthService.setToken("token");
			expect(AuthService.isTokenValid()).toBe(true);
		});
	});
	
	describe("setToken", () => {
		it("should put the token as given into localstorage", () => {
			AuthService.setToken("i am a token");
			expect(localStorage.getItem('token')).toEqual("i am a token");
			AuthService.setToken("null");
			expect(localStorage.getItem('token')).toEqual("null");
		});
		
		it("should change null to a string null", () => {
			AuthService.setToken(null);
			expect(localStorage.getItem('token')).toEqual("null");
		});
	});
	
	describe("getToken", () => {
		it("should return the token from localstorage", () => {
			localStorage.setItem('token', "stuff");
			expect(AuthService.getToken()).toBe("stuff");
		});
		
		it("should translate 'null' to null", () => {
			localStorage.setItem('token', "null");
			expect(AuthService.getToken()).toBeNull();
		});
	});
	
	describe("logout", () => {
		it("should remove token from localStorage", () => {
			localStorage.setItem('token', 'stuff');
			AuthService.logout();
			expect(localStorage.getItem('token')).toBeNull();
		});
	});

})