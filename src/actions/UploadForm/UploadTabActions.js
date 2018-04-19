import actionNames from '../actionNames'

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

export const appendToFileList = (fileID, fileName, fileDescription) => {
    return {
        type: actionNames.APPEND_TO_FILE_LIST,
        payload: {id: fileID, fileName: fileName, description: fileDescription}
    }
};
