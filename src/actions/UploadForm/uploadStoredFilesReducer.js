import actionNames from '../actionNames';

export const storedFiles = (state = [], action) => {
    switch(action.type) {
        case actionNames.UPLOAD_STORED_FILES:
            return action.payload;
        default:
            return state;
    }
}
