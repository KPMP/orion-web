import actionNames from '../../actions/actionNames';
import { packageTypeIcons } from './packageTypeIconsReducer';

describe('packageTypeIcons', () => {
	it('should return the given state when not SET_PACKAGE_TYPE_ICONS', () => {
		let action = {
				type: 'SOME_OTHER_ACTION',
				payload: [{'key': 'value'}]
			};
			let expectedState = [ {'stateKey': 'stateValue'}];
			expect(packageTypeIcons(expectedState, action)).toEqual(expectedState);
	});
	
	it('should return [] in state if state is undefined and not a covered action', () => {
		let action = {
			type: 'SOME_OTHER_ACTION',
			payload: [{'key': 'value'}]
		};
		expect(packageTypeIcons(undefined, action)).toEqual([]);
	});
	
	it('should construct the appropriate state for SET_PACKAGE_TYPE_ICONS action', () => {
		let action = {
			type: actionNames.SET_PACKAGE_TYPE_ICONS,
			payload: [ 'a', 'b', 'c' ]
		};
		let expectedState = [ 'a', 'b', 'c' ];
		
		expect(packageTypeIcons([], action)).toEqual(expectedState);
	});
});