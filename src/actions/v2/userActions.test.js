import { setUserInformation } from './userActions';
import actionNames from '../actionNames';

describe('setUserInformation', () => {
	it('should create the correct action', () => {
		let payload = {'name': 'jon', 'email': 'nonya@gmail.com'};
		let expectedAction = {
			type: actionNames.SET_USER_INFORMATION,
			payload: payload
		}
		let action = setUserInformation(payload);
		expect(action).toEqual(expectedAction);
	});
});