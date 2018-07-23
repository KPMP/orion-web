import actionNames from '../../../actions/actionNames';

export const packages = (state = [], action) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.SET_PACKAGES:
			console.log(action.payload);
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}