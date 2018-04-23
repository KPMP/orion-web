import actionNames from '../actionNames'

export const changeUploadTab = (tabIndex) => {
	console.log(tabIndex);
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

export const uploadPackageInfo = (data) => {
    const url = "http://localhost:3030/upload/packageInfo";

    return (dispatch) => {
        fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            }
        )
            .catch(err => console.error(err));
    };

};
