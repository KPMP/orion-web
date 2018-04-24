import actionNames from '../actionNames';

export const showUploadModal = (state = true, action) => {
	switch(action.type) {
		case actionNames.SHOW_UPLOAD_MODAL:
			return action.payload;
		default:
			return state;
	}
	
}