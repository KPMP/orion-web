import actionNames from '../../actions/actionNames';
import { stateDisplayMap } from './stateDisplayMapReducer';

describe('stateDisplayMap', () => {
	it('should return the given state when not SET_STATE_DISPLAY_MAP', () => {
		let action = {
				type: 'SOME_OTHER_ACTION',
				payload: [{'key': 'value'}]
			};
			let expectedState = [ {'stateKey': 'stateValue'}];
			expect(stateDisplayMap(expectedState, action)).toEqual(expectedState);
	});
	
	it('should return {} in state if state is undefined and not a covered action', () => {
		let action = {
			type: 'SOME_OTHER_ACTION',
			payload: [{'key': 'value'}]
		};
		expect(stateDisplayMap(undefined, action)).toEqual({});
	});
	
	it('should construct the appropriate state for SET_STATE_DISPLAY_MAP action', () => {
		let action = {
			type: actionNames.SET_STATE_DISPLAY_MAP,
			payload: { 'map': 'a' }
		};
		let expectedState = { 'map': 'a' };
		
		expect(stateDisplayMap({}, action)).toEqual(expectedState);
	});
});