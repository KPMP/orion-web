import actionNames from '../actions/actionNames';

export const uploadedFiles = (state = [], action) => {
    switch(action.type) {
        case actionNames.SET_UPLOADED_FILES_LIST:
            return action.payload;
        default:
            return state;
    }
};
