import actionNames from '../../actions/actionNames';
import { packages } from './packagePanelReducer';
import * as filterActions from '../../actions/filterActions';


describe('packages', () => {
	it('should return the given state when not a covered action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [ {"stateKey": "stateValue"}];
		expect(packages(expectedState, action)).toEqual(expectedState);
	});

	it('should return {} in state if state is undefined and not a covered action', () => {
		let action = {
				type: "SOME_OTHER_ACTION",
				payload: [{"key": "value"}]
		};
		expect(packages(undefined, action)).toEqual({});
	});
	
	describe("set_packages action", () => {
		
		it('should set the filtered and unfiltered list', () => {
			let action = {
					type: actionNames.SET_PACKAGES,
					payload: [{"key": "value"}]
			};
			let currentState = [ {"stateKey": "stateValue"}];
			let expectedState = { unfiltered: [{"key": "value"}], filtered: [{"key": "value"}], filters: []};
			expect(packages(currentState, action)).toEqual(expectedState);
		});
	});
	
	describe("add_filters action", () => {
		
		it('should return packages that match the institution I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio' }}, { packageInfo: {institution: 'UMICH'}}, {packageInfo: {intitution: 'UW'}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio' }}, { packageInfo: {institution: 'UMICH'}}, {packageInfo: {intitution: 'UW'}} ],
					filters: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.INSTITUTION, value: 'UMICH' }
			};
			
			expect(packages(state, action)).toEqual({ filtered: [{ packageInfo: {institution: 'UMICH'}}],
				unfiltered: [ {packageInfo: { institution: 'Ohio' }}, { packageInfo: {institution: 'UMICH'}}, {packageInfo: {intitution: 'UW'}} ], filters: [action.payload]});
		});
		it('should return packages that match the package type I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', packageType: 'X' }}, { packageInfo: {institution: 'UMICH', packageType: 'X'}}, {packageInfo: {intitution: 'UW', packageType: 'Y'}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', packageType: 'X' }}, { packageInfo: {institution: 'UMICH', packageType: 'X'}}, {packageInfo: {intitution: 'UW', packageType: 'Y'}} ],
					filters: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'X' }
			};
			
			expect(packages(state, action)).toEqual({ filtered: [{packageInfo: { institution: 'Ohio', packageType: 'X' }},{ packageInfo: {institution: 'UMICH', packageType: 'X'}}],
				unfiltered: [ {packageInfo: { institution: 'Ohio', packageType: 'X' }}, { packageInfo: {institution: 'UMICH', packageType: 'X'}}, {packageInfo: {intitution: 'UW', packageType: 'Y'}} ],
				filters: [ action.payload ]});
		});
		it('should return packages that match the submitter I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { submitter: { id: '123'} }}, { packageInfo: {submitter: { id: '345'}}}, {packageInfo: {submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { submitter: { id: '123'}}}, { packageInfo: { submitter: {id: '345'} }}, {packageInfo: {submitter: { id: '123'}}} ],
					filters: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '123' }
			};
			
			expect(packages(state, action)).toEqual({ filtered: [{packageInfo: { submitter: { id: '123'} }}, {packageInfo: {submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { submitter: { id: '123'} }}, { packageInfo: {submitter: { id: '345'}}}, {packageInfo: {submitter: { id: '123'}}} ],
				filters: [ action.payload ]});
		});
		it('should AND my filteres together', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.INSTITUTION, value: 'UW'}]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '123' }
			};
			
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.INSTITUTION, value: 'UW'}, { filterType: filterActions.filterTypes.SUBMITTER, value: '123' } ]});
			
		});
		it('should replace an existing institution filter', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.INSTITUTION, value: 'UW'}]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.INSTITUTION, value: 'UMICH' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {institution: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.INSTITUTION, value: 'UMICH'} ]});
			
		});
		it('should replace an existing package type filter', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', packageType: 'Stuff'}}, {packageInfo: {institution: 'UW', packageType: 'Other stuff'}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', packageType: 'Stuff' }}, {packageInfo: {institution: 'UW', packageType: 'Other stuff'}} ],
					filters: [{filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Stuff'}]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other stuff' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {institution: 'UW', packageType:'Other stuff'}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', packageType: 'Stuff' }}, {packageInfo: {institution: 'UW', packageType: 'Other stuff'}}  ],
				filters: [ {filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other stuff'} ]});
			
		});
		it('should replace an existing submitter filter', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.SUBMITTER, value: '123'}]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '345' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {institution: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.SUBMITTER, value: '345'} ]});
			
		});
		it('should handle replacing filter when multiple', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{ filterType: filterActions.filterTypes.INSTITUTION, value: 'UMICH'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '123'}]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '345' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {institution: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
				filters: [ { filterType: filterActions.filterTypes.INSTITUTION, value: 'UMICH'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '345'} ]});
		});
		it('should return the packages with package types outside of predefined set when package type "Other" is selected', () => {
			let state = {
					filtered: [ {packageInfo: { packageType: 'CODEX', institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { packageType: 'CODEX', institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', institution: 'UW', submitter: { id: '123'}}} ],
					filters: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{ packageInfo: { packageType: 'Random type', institution: 'UMICH', submitter: { id: '345'}}}],
				unfiltered: [ {packageInfo: { packageType: 'CODEX', institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', institution: 'UW', submitter: { id: '123'}}} ],
				filters: [ { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other' } ]});
		});
	});
	describe("remove_filter action", () => {
		
		it('should remove filter and update filtered packages', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.INSTITUTION, value: 'UW'}],
					userList: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.INSTITUTION, value: 'UW' }
			};
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: []})
		});
		it('should remove filter and update filtered packages', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.INSTITUTION, value: 'UW'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
					userList: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.INSTITUTION, value: 'UW' }
			};
			expect(packages(state, action)).toEqual({filtered: [  { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				filters: [{filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
				userList: []})
		});
	});
	describe("set_users action", () => {
		it('should add users', () => {
			let state = {
					filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
					filters: [],
					userList: []
			};
			let action = {
					type: actionNames.SET_USERS,
					payload: [{user: 'john', id: '123'}]
			}
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [{user: 'john', id: '123'}]})
		});
	});
});