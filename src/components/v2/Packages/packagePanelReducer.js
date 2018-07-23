import actionNames from '../../../actions/actionNames';

export const packages = (state = [], action) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.SET_PACKAGES:
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}