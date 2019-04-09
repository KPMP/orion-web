import { addDTD } from './dtdActions';
import actionNames from './actionNames';

describe('addDTD', () => {
	it('should create action correctly', () => {
		let action = addDTD({ id: '123' });
		let expectedResult = {
			type: actionNames.ADD_DTD,
			payload: { id: '123' }
		}
		
		expect(action).toEqual(expectedResult);
	});
});