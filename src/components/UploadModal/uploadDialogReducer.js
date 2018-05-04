import actionNames from '../../actions/actionNames';

export const uploadDialog = (state = {}, action) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.CHANGE_UPLOAD_TAB:
			newState.currentTab = action.payload;
	        return newState;
		case actionNames.UPDATE_FILE_DESCRIPTION:
			newState.fileDescription = action.payload;
            return newState;
		case actionNames.APPEND_TO_FILE_LIST:
			newState.fileList = [...state.fileList, action.payload];
            return newState;
        case actionNames.CLEAR_FILE_LIST:
        		newState.fileList = [];
        		return newState;
        case actionNames.SET_PACKAGE_INFO:
        		newState.packageInfo = action.payload;
            return newState;
        case actionNames.SHOW_FILE_PROGRESS_MODAL:
        		newState.showFileProgressModal = action.payload;
            return newState;
        case actionNames.SHOW_UPLOAD_MODAL:
        		newState.showUploadModal = action.payload;
			return newState;
        case actionNames.UPDATE_UPLOAD_STATUS:
        		newState.uploadStatus = action.payload;
            return newState;
	    default:
	        return state;
	}
}