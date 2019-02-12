import * as filterActions from './filterActions';
import actionNames from './actionNames';

describe('addFilter', () => {
	it('should create the correct action', () => {
		let payload = {filterType: filterActions.filterTypes.INSTITUTION, value: 'umich'};
		let expectedAction = {
			type: actionNames.ADD_FILTER,
			payload: payload
		}
		let action = filterActions.addFilter(filterActions.filterTypes.INSTITUTION, 'umich');
		expect(action).toEqual(expectedAction);
	});
});

describe('removeFilter', () => {
	it('should create the correct action', () => {
		let payload = {filterType: filterActions.filterTypes.INSTITUTION, value: 'umich'};
		let expectedAction = {
				type: actionNames.REMOVE_FILTER,
				payload: payload
		}
		let action = filterActions.removeFilter(filterActions.filterTypes.INSTITUTION, 'umich');
		expect(action).toEqual(expectedAction);
	});
});

describe('setUsers', () => {
	it('should create the correct action', () => {
		let payload = [{user: 'johnny', id:'123'}];
		let expectedAction = {
			type: actionNames.SET_USERS,
			payload: payload
		}
		let action = filterActions.setUsers(payload);
		expect(action).toEqual(expectedAction);
	})
})