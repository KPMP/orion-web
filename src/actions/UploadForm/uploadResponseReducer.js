import actionNames from '../actionNames';

export const uploadResponse = (state = {}, action) => {
    switch(action.type) {
        case actionNames.UPDATE_UPLOAD_RESPONSE:
            return action.payload;
        default:
            return state;
    }
};
