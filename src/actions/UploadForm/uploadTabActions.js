import actionNames from '../actionNames';
import Api from '../../helpers/Api';
const api = Api.getInstance();

export const removeFileFromList = (index) => {
	return {
		type: actionNames.REMOVE_FILE_FROM_LIST,
		payload: index
	}
}

export const showUploadModalAction = (show) => {
	return {
		type: actionNames.SHOW_UPLOAD_MODAL,
		payload: show
	}
};

export const showFileProgressModalAction = (show) => {
    return {
        type: actionNames.SHOW_FILE_PROGRESS_MODAL,
        payload: show
    }
};

export const changeUploadTab = (tabIndex) => {
	return {
		type: actionNames.CHANGE_UPLOAD_TAB,
		payload: tabIndex
	}
};

export const updateFileDescription = (description) => {
    return {
        type: actionNames.UPDATE_FILE_DESCRIPTION,
        payload: description
    }
};

export const setPackageInfo = (data) => {
    return {
        type: actionNames.SET_PACKAGE_INFO,
        payload: data
    }
};

export const appendToFileList = (file) => {
    return {
        type: actionNames.APPEND_TO_FILE_LIST,
        payload: file
    }
};

export const clearFileList = () => {
	return {
		type: actionNames.CLEAR_FILE_LIST
	}
};

export const setUploadedFilesList = (uploadedFiles) => {
	return {
		type: actionNames.SET_UPLOADED_FILES_LIST,
		payload: uploadedFiles
	}
};

export const uploadPackageInfo = (data) => {
    return (dispatch) => {
        api.post('/upload/packageInfo', data)
          .then((res) => {
            dispatch(setPackageInfo(res.data));
          })
          .catch((err) => {
            alert("We were unable to process your request, please try again");
            console.log(err);
          })
    };
};

export const uploadFinish = (packageId) => {
    return (dispatch) => {
        api.post('/upload/finish', {packageId: packageId})
            .then((res) => {
            })
            .catch((err) => {
                alert("We were unable to process your request, please try again");
                console.log(err);
            })
    };
};

export const viewUploadedFiles = () => {
	return (dispatch) => {
		api.get('/viewUploads')
			.then(res => {
				dispatch(setUploadedFilesList(res.data));
			})
			.catch(err => {
                alert("Cannot connect to KPMP Data Lake File Repository");
                console.error(err);
            });
	};
};

export const updateUploadStatus = (status) => {
    return {
        type: actionNames.UPDATE_UPLOAD_STATUS,
        payload: status
    }
};

export const resetUploadModal = () => {
	return {
		type: actionNames.RESET_UPLOAD_MODAL
	}
}