import actionNames from '../../actions/actionNames';

export const isUploading = ( state = false, action ) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.SET_IS_UPLOADING:
			newState = action.payload;
			return newState;
		default:
			return state;
	}
}