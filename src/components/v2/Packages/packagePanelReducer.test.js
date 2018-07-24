import actionNames from '../../../actions/actionNames';
import { packages } from './packagePanelReducer';

describe('packages', () => {
	it('should return the given state when not SET_PACKAGES action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [ {"stateKey": "stateValue"}];
		expect(packages(expectedState, action)).toEqual(expectedState);
	});
	
	it('should set the action.payload when it is SET_PACKAGES action', () => {
		let action = {
			type: actionNames.SET_PACKAGES,
			payload: [{"key": "value"}]
		};
		let currentState = [ {"stateKey": "stateValue"}];
		let expectedState = [{"key": "value"}];
		expect(packages(currentState, action)).toEqual(expectedState);
	});
	
	it('should return [] in state if state is undefined and not SET_PACKAGES action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		expect(packages(undefined, action)).toEqual([]);
	});
});