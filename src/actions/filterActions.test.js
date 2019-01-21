import { addFilter } from './filterActions';
import actionNames from './actionNames';

describe('addFilter', () => {
	it('should create the correct action', () => {
		let payload = {filterType: 'institution', value: 'umich'};
		let expectedAction = {
			type: actionNames.ADD_FILTER,
			payload: payload
		}
		let action = addFilter('institution', 'umich');
		expect(action).toEqual(expectedAction);
	});
});