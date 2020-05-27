import { setStateDisplayMap } from './stateActions';	
import actionNames from './actionNames';	

describe('setStateDisplayMap', () => {
	it('should create the correct action', () => {	
		let payload = {'name': 'jon', 'email': 'nonya@gmail.com'};	
		let expectedAction = {	
			type: actionNames.SET_STATE_DISPLAY_MAP,	
			payload	
		};
		let action = setStateDisplayMap(payload);	
		expect(action).toEqual(expectedAction);	
	});	
	
});