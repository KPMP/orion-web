import actionNames from '../actionNames';

export const filesToUpload = (state = [], action) => {
    switch(action.type) {
        case actionNames.UPDATE_FILES_TO_UPLOAD:
            return action.payload;
        default:
            return state;
    }
}
