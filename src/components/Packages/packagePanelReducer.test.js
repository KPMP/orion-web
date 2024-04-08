import actionNames from '../../actions/actionNames';
import { filtering, dtds } from './packagePanelReducer';
import * as filterActions from '../../actions/filterActions';

describe('dtds', () => {
	it('should return the given state when not a covered action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [ {"stateKey": "stateValue"}];
		expect(dtds(expectedState, action)).toEqual(expectedState);
	});
	
	it('should return {} in state if state is undefined and not a covered action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		expect(dtds(undefined, action)).toEqual({});
	});
	
	it('should construct the appropriate state for ADD_DTD action and an empty state', () => {
		let action = {
			type: actionNames.ADD_DTD,
			payload: { version: 0, standardFields: [] }
		};
		let expectedState = {
			0: 	{ version: 0, standardFields: [] }
		};
		
		expect(dtds({}, action)).toEqual(expectedState);
	});
	it('should construct the appropriate state for ADD_DTD action and a non-empty state', () => {
		let action = {
				type: actionNames.ADD_DTD,
				payload: { version: 0, standardFields: [] }
		};
		let expectedState = {
			1: { version: 1, standardFields: [] },
			0: { version: 0, standardFields: [] }
		};
		let currentState = {
			1: { version: 1, standardFields: [] }
		}
		
		expect(dtds(currentState, action)).toEqual(expectedState);
	});
});


describe('packages', () => {
	it('should return the given state when not a covered action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [{"stateKey": "stateValue"}];
		expect(filtering(expectedState, action)).toEqual(expectedState);
	});

	it('should return {} in state if state is undefined and not a covered action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		expect(filtering(undefined, action)).toEqual({});
	});
})
	
	describe("remove_filter action", () => {
		
		it('should remove filter', () => {
			let state = {
					filters: [{filterType: filterActions.filterTypes.SITE_NAME, value: 'UW'}],
					userList: [], packageTypes: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.SITE_NAME, value: 'UW' }
			};
			expect(filtering(state, action)).toEqual({
				filters: [],
				userList: [], packageTypes: []})
		});
		it('should remove filter', () => {
			let state = {
					filters: [{filterType: filterActions.filterTypes.SITE_NAME, value: 'UW'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
					userList: [], packageTypes: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.SITE_NAME, value: 'UW' }
			};
			expect(filtering(state, action)).toEqual(
				{
				filters: [{filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
				userList: [], packageTypes: []})
		});
	});

	describe("set_users action", () => {
		it('should add users', () => {
			let state = {
				filters: [],
				userList: []
			};
			let action = {
				type: actionNames.SET_USERS,
				payload: [{user: 'john', id: '123'}]
			}
			expect(filtering(state, action)).toEqual({
				filters: [],
				userList: [{user: 'john', id: '123'}]})
		});
	});
	describe("set_package_types action", () => {
		it('should add package types', () => {
			let state = {
				filters: [],
				userList: [], packageTypes: []
			};
			let action = {
				type: actionNames.SET_PACKAGE_TYPES,
				payload: ["Type 1", "Type 2"]
			};
			expect(filtering(state, action)).toEqual({
				filters: [],
				userList: [],
				packageTypes: ["Type 1", "Type 2"]
			})
		});
	});
	describe("set_site_names action", () => {
		it('should add siteNames', () => {
			let state = {
					filters: [],
					userList: [], 
					packageTypes: ["Type 1", "Type 2"], 
					siteNames: []
			};
			let action = {
					type: actionNames.SET_SITE_NAMES,
					payload: ["Name 1", "Name 2"]
			};
			expect(filtering(state, action)).toEqual({
				filters: [],
				userList: [],
				packageTypes: ["Type 1", "Type 2"],
				siteNames: ["Name 1", "Name 2"]
			})
		});
	});