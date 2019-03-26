import actionNames from '../../actions/actionNames';

export const forms = (state={}, action) => {
	let newState = {}; 
	switch(action.type) {
		case actionNames.SET_FORM_FOR_VERSION:
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}