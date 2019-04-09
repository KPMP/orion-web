import actionNames from '../../actions/actionNames';
import { packages, dtds } from './packagePanelReducer';
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
		
		it('should return packages that match the tisName I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio' }}, { packageInfo: {tisName: 'UMICH'}}, {packageInfo: {tisName: 'UW'}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio' }}, { packageInfo: {tisName: 'UMICH'}}, {packageInfo: {tisName: 'UW'}} ],
					filters: [],
					packageTypes: ["Type 1"],
					tisNames: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.TIS_NAME, value: 'UMICH' }
			};
			
			expect(packages(state, action)).toEqual({ filtered: [{ packageInfo: {tisName: 'UMICH'}}],
				unfiltered: [ {packageInfo: { tisName: 'Ohio' }}, { packageInfo: {tisName: 'UMICH'}}, {packageInfo: {tisName: 'UW'}} ], filters: [action.payload], packageTypes: ["Type 1"], tisNames:[]});
		});
		it('should return packages that match the package type I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', packageType: 'X' }}, { packageInfo: {tisName: 'UMICH', packageType: 'X'}}, {packageInfo: {tisName: 'UW', packageType: 'Y'}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', packageType: 'X' }}, { packageInfo: {tisName: 'UMICH', packageType: 'X'}}, {packageInfo: {tisName: 'UW', packageType: 'Y'}} ],
					filters: [],
					packageTypes: ["X", "Y"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'X' }
			};
			
			expect(packages(state, action)).toEqual({ filtered: [{packageInfo: { tisName: 'Ohio', packageType: 'X' }},{ packageInfo: {tisName: 'UMICH', packageType: 'X'}}],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', packageType: 'X' }}, { packageInfo: {tisName: 'UMICH', packageType: 'X'}}, {packageInfo: {tisName: 'UW', packageType: 'Y'}} ],
				filters: [ action.payload ], packageTypes: ["X", "Y"]});
		});
		it('should return packages that match the submitter I filtered to', () => {
			let state = {
					filtered: [ {packageInfo: { submitter: { id: '123'} }}, { packageInfo: {submitter: { id: '345'}}}, {packageInfo: {submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { submitter: { id: '123'}}}, { packageInfo: { submitter: {id: '345'} }}, {packageInfo: {submitter: { id: '123'}}} ],
					filters: [],
					userList: [],
					packageTypes: ["Type 1"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '123' }
			};
			expect(packages(state, action)).toEqual({ filtered: [{packageInfo: { submitter: { id: '123'} }}, {packageInfo: {submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { submitter: { id: '123'} }}, { packageInfo: {submitter: { id: '345'}}}, {packageInfo: {submitter: { id: '123'}}} ],
				filters: [ action.payload ], userList: [], packageTypes: ["Type 1"]});
		});
		it('should AND my filteres together', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.TIS_NAME, value: 'UW'}],
					packageTypes: ["Type 1"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '123' }
			};
			
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.TIS_NAME, value: 'UW'}, { filterType: filterActions.filterTypes.SUBMITTER, value: '123' } ], packageTypes: ["Type 1"]});
			
		});
		it('should replace an existing tisName filter', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.TIS_NAME, value: 'UW'}],
					packageTypes: ["Type 1"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.TIS_NAME, value: 'UMICH' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {tisName: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.TIS_NAME, value: 'UMICH'} ], packageTypes: ["Type 1"]});
			
		});
		it('should replace an existing package type filter', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}, packageType: 'Stuff' }}, { packageInfo: { tisName: 'UMICH', packageType: 'Stuff'}}, {packageInfo: {tisName: 'UW', packageType: 'Other stuff'}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}, packageType: 'Stuff'}}, { packageInfo: { tisName: 'UMICH', packageType: 'Stuff' }}, {packageInfo: {tisName: 'UW', packageType: 'Other stuff'}} ],
					filters: [{filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Stuff'}], packageTypes: ["Stuff"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other stuff' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {tisName: 'UW', packageType:'Other stuff'}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}, packageType: 'Stuff'}}, { packageInfo: { tisName: 'UMICH', packageType: 'Stuff' }}, {packageInfo: {tisName: 'UW', packageType: 'Other stuff'}}  ],
				filters: [ {filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other stuff'} ], packageTypes: ["Stuff"]});
			
		});
		it('should replace an existing submitter filter', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.SUBMITTER, value: '123'}], packageTypes: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '345' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {tisName: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}}  ],
				filters: [ {filterType: filterActions.filterTypes.SUBMITTER, value: '345'} ], packageTypes: []});
			
		});
		it('should handle replacing filter when multiple', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{ filterType: filterActions.filterTypes.TIS_NAME, value: 'UMICH'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '123'}], packageTypes: []
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '345' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{packageInfo: {tisName: 'UMICH', submitter: { id: '345'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}}  ],
				filters: [ { filterType: filterActions.filterTypes.TIS_NAME, value: 'UMICH'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '345'} ], packageTypes: []});
		});
		it('should return the packages with package types outside of predefined set when package type "Other" is selected', () => {
			let state = {
					filtered: [ {packageInfo: { packageType: 'CODEX', tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { packageType: 'CODEX', tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [], packageTypes: ["Bulk RNA-Seq", "CODEX"]
			};
			let action = {
					type: actionNames.ADD_FILTER,
					payload: { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other' }
			};
			let newState = packages(state, action);
			expect(newState).toEqual({ filtered: [{ packageInfo: { packageType: 'Random type', tisName: 'UMICH', submitter: { id: '345'}}}],
				unfiltered: [ {packageInfo: { packageType: 'CODEX', tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { packageType: 'Random type', tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: { packageType: 'Bulk RNA-Seq', tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [ { filterType: filterActions.filterTypes.PACKAGE_TYPE, value: 'Other' } ], packageTypes: ["Bulk RNA-Seq", "CODEX"]});
		});
	});
	describe("remove_filter action", () => {
		
		it('should remove filter and update filtered packages', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.TIS_NAME, value: 'UW'}],
					userList: [], packageTypes: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.TIS_NAME, value: 'UW' }
			};
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [], packageTypes: []})
		});
		it('should remove filter and update filtered packages', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [{filterType: filterActions.filterTypes.TIS_NAME, value: 'UW'}, {filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
					userList: [], packageTypes: []
			};
			let action = {
					type: actionNames.REMOVE_FILTER,
					payload: { filterType: filterActions.filterTypes.TIS_NAME, value: 'UW' }
			};
			expect(packages(state, action)).toEqual({filtered: [  { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [{filterType: filterActions.filterTypes.SUBMITTER, value: '345'}],
				userList: [], packageTypes: []})
		});
	});
	describe("set_users action", () => {
		it('should add users', () => {
			let state = {
				filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: []
			};
			let action = {
				type: actionNames.SET_USERS,
				payload: [{user: 'john', id: '123'}]
			}
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [{user: 'john', id: '123'}]})
		});
	});
	describe("set_package_types action", () => {
		it('should add package types', () => {
			let state = {
				filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [], packageTypes: []
			};
			let action = {
				type: actionNames.SET_PACKAGE_TYPES,
				payload: ["Type 1", "Type 2"]
			};
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [],
				packageTypes: ["Type 1", "Type 2"]
			})
		});
	});
	describe("set_tis_names action", () => {
		it('should add tisNames', () => {
			let state = {
					filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { tisName: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
					filters: [],
					userList: [], 
					packageTypes: ["Type 1", "Type 2"], 
					tisNames: []
			};
			let action = {
					type: actionNames.SET_TIS_NAMES,
					payload: ["Name 1", "Name 2"]
			};
			expect(packages(state, action)).toEqual({filtered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { tisName: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { tisName: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {tisName: 'UW', submitter: { id: '123'}}} ],
				filters: [],
				userList: [],
				packageTypes: ["Type 1", "Type 2"],
				tisNames: ["Name 1", "Name 2"]
			})
		});
	});
});
