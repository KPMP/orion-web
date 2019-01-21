import actionNames from '../../actions/actionNames';

export const packages = (state = {}, action) => {
	let newState = {}; 
	switch(action.type) {
		case actionNames.SET_PACKAGES:
			newState.filtered = action.payload;
			newState.unfiltered = action.payload;
			return newState;
		default:
			return state;
	}
}