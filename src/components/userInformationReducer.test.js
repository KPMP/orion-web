import { userInformation } from './userInformationReducer';	
import actionNames from '../actions/actionNames';	

 describe('userInformation', () => {	
	it('should set state when actionName is SET_USER_INFORMATION', () => {	
		let expectedState = { 'displayName': 'Nikola Tesla', 'firstName': 'Nikola' };	
		let action = {	
			type: actionNames.SET_USER_INFORMATION,	
			payload: expectedState	
		};	
		let result = userInformation({}, action);	
		expect(result).toEqual(expectedState);	
	});	

 	it('should ignore an action when actionName is not SET_USER_INFORMATION', () => {	
		let payload = { 'displayName': 'Nikola Tesla', 'firstName': 'Nikola' };	
		let action = {	
			type: 'another action',	
			payload: payload	
		};	
		let result = userInformation({}, action);	
		expect(result).toEqual({});	
	});	

 	it('should return {} in state if state is undefined and not SET_USER_INFORMATION action', () => {	
		let action = {	
			type: "SOME_OTHER_ACTION",	
			payload: [{"key": "value"}]	
		};	
		expect(userInformation(undefined, action)).toEqual({});	
	});	
});