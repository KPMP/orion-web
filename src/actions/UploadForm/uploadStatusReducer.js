import actionNames from '../actionNames';

export const uploadStatus = (state = "", action) => {
    switch(action.type) {
        case actionNames.UPDATE_UPLOAD_STATUS:
            return action.payload;
        default:
            return state;
    }
}