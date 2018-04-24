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

};
