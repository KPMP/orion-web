import actionNames from '../actionNames'
import Api from '../../helpers/Api'

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

export const uploadStoredFiles = (data) => {
    return {
        type: actionNames.UPLOAD_STORED_FILES,
        payload: data
    }
};

export const appendToFileList = (file) => {
    return {
        type: actionNames.APPEND_TO_FILE_LIST,
        payload: file
    }
};

export const uploadPackageInfo = (data) => {
    const api = Api.getInstance()
    const url = "http://localhost:3030/upload/packageInfo";

    return (dispatch) => {
        api.post('/upload/packageInfo', data)
          .then((res) => {
            console.log(res.data)
            // dispatch(uploadStoredFiles(res.data));
          })
          .catch((err) => {
            console.log(err)
          })
    };

};
