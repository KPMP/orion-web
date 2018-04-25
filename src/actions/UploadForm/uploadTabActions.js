import actionNames from '../actionNames'

export const showUploadModalAction = (show) => {
	return {
		type: actionNames.SHOW_UPLOAD_MODAL,
		payload: show
	}
}

export const changeUploadTab = (tabIndex) => {
	return {
		type: actionNames.CHANGE_UPLOAD_TAB,
		payload: tabIndex
	}
}

export const updateFilesToUpload = (files) => {
    return {
        type: actionNames.UPDATE_FILES_TO_UPLOAD,
        payload: files
    }
};

export const updateFileDescription = (description) => {
    return {
        type: actionNames.UPDATE_FILE_DESCRIPTION,
        payload: description
    }
};

export const appendToFileList = (file) => {
    return {
        type: actionNames.APPEND_TO_FILE_LIST,
        payload: file
    }
};

export const setUploadedFilesList = (uploadedFiles) => {
	return {
		type: actionNames.SET_UPLOADED_FILES_LIST,
		payload: uploadedFiles
	}
}

export const uploadPackageInfo = (data) => {
    const api = Api.getInstance();

    return (dispatch) => {
        api.post('/upload/packageInfo', data)
          .then((res) => {
            dispatch(setPackageInfo(res.data));
          })
          .catch((err) => {
            console.error(err);
          })
    };

export const viewUploadedFiles = () => {
	const url = "http://localhost:3030/viewUploads";
	return (dispatch) => {
		fetch(url, {
			method: "GET",
			mode: "cors",
			enctype: "multipart/form-data"
		})
		.then(res => res.json())
		.then(res => {
			dispatch(setUploadedFilesList(res));
		}
		)
		.catch(err => console.error(err));
	};
}