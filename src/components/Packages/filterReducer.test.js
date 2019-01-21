import { filterPackages } from './filterReducer';
import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';

describe('filterPackages', () => {
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
		
		expect(filterPackages(state, action)).toEqual({ filtered: [{ packageInfo: {institution: 'UMICH'}}],
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
		
		expect(filterPackages(state, action)).toEqual({ filtered: [{packageInfo: { institution: 'Ohio', packageType: 'X' }},{ packageInfo: {institution: 'UMICH', packageType: 'X'}}],
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
		
		expect(filterPackages(state, action)).toEqual({ filtered: [{packageInfo: { submitter: { id: '123'} }}, {packageInfo: {submitter: { id: '123'}}} ],
			unfiltered: [ {packageInfo: { submitter: { id: '123'} }}, { packageInfo: {submitter: { id: '345'}}}, {packageInfo: {submitter: { id: '123'}}} ],
			filters: [ action.payload ]});
	});
	it('should AND my filteres together', () => {
		let state = {
				filtered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, { packageInfo: { institution: 'UMICH', submitter: { id: '345'}}}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
				filters: []
		};
		let action = {
				type: actionNames.ADD_FILTER,
				payload: { filterType: filterActions.filterTypes.SUBMITTER, value: '123' }
		};
		
		let newState = filterPackages(state, action);
		expect(newState).toEqual({ filtered: [{packageInfo: { institution: 'Ohio', submitter: { id: '123'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
			unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
			filters: [ action.payload ]});
		
		let secondAction = {
				type: actionNames.ADD_FILTER,
				payload: { filterType: filterActions.filterTypes.INSTITUTION, value: 'UW' }
		};
		expect(filterPackages(newState, secondAction)).toEqual({ filtered: [{packageInfo: {institution: 'UW', submitter: { id: '123'}}} ],
			unfiltered: [ {packageInfo: { institution: 'Ohio', submitter: { id: '123'}}}, { packageInfo: { institution: 'UMICH', submitter: {id: '345'} }}, {packageInfo: {institution: 'UW', submitter: { id: '123'}}}  ],
			filters: [ action.payload, secondAction.payload]});
	});
	it('should return {} in state if state is undefined and not ADD_FILTER action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		expect(filterPackages(undefined, action)).toEqual({});
	});
	it('should return the given state when not ADD_FILTER action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [ {"stateKey": "stateValue"}];
		expect(filterPackages(expectedState, action)).toEqual(expectedState);
	});
	
});