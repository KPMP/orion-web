import actionNames from '../actionNames';

export const fileList = (state = [], action) => {
    switch(action.type) {
        case actionNames.APPEND_TO_FILE_LIST:
            return [...state, action.payload]
        default:
            return state;
    }
}