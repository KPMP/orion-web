import actionNames from '../actionNames'

export const updateFilesToUpload = (files) => {
    return {
        type: actionNames.UPDATE_FILES_TO_UPLOAD,
        payload: files
    }
};
