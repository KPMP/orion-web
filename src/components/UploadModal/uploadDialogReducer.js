import actionNames from '../../actions/actionNames';
import initialState from '../../initialState.json';

export const uploadDialog = (state = {}, action) => {
	let newState = {...state}; 
	switch(action.type) {
		case actionNames.APPEND_TO_FILE_LIST:
			newState.fileList = [...state.fileList, action.payload];
			newState.fileDescription = "";
			return newState;
		case actionNames.CHANGE_UPLOAD_TAB:
			newState.currentTab = action.payload;
	        return newState;
		case actionNames.CLEAR_FILE_LIST:
			newState.fileList = [];
			return newState;
		case actionNames.REMOVE_FILE_FROM_LIST:
			let newList = state.fileList.slice(0);
			newList.splice(action.payload, 1);
			newState.fileList = newList;
			return newState;
		case actionNames.RESET_UPLOAD_MODAL:
			newState = initialState.uploadDialog;
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
        case actionNames.UPDATE_FILE_DESCRIPTION:
        		newState.fileDescription = action.payload;
        		return newState;
        case actionNames.UPDATE_UPLOAD_STATUS:
        		newState.uploadStatus = action.payload;
            return newState;
	    default:
	        return state;
	}
}