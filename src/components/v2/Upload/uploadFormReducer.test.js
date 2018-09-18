import actionNames from '../../../actions/actionNames';
import { isUploading } from './uploadFormReducer';

describe('isUploading', () => {
	it('should return the given state when not SET_IS_UPLOADING action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		let expectedState = [ {"stateKey": "stateValue"}];
		expect(isUploading(expectedState, action)).toEqual(expectedState);
	});
	
	it('should set the action.payload when it is SET_IS_UPLOADING action', () => {
		let action = {
			type: actionNames.SET_IS_UPLOADING,
			payload: true
		};
		let currentState = [ {"stateKey": "stateValue"}];
		let expectedState = true;
		expect(isUploading(currentState, action)).toEqual(expectedState);
	});
	
	it('should return [] in state if state is undefined and not SET_IS_UPLOADING action', () => {
		let action = {
			type: "SOME_OTHER_ACTION",
			payload: [{"key": "value"}]
		};
		expect(isUploading(undefined, action)).toEqual(false);
	});
	
});