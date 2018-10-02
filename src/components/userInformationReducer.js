import actionNames from '../actions/actionNames';

export const userInformation = (state = {}, action) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.SET_USER_INFORMATION:
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}