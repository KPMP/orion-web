import actionNames from '../actionNames';

export const fileList = (state = [], action) => {
    switch(action.type) {
        case actionNames.APPEND_TO_FILE_LIST:
            return [...state, action.payload]
        case actionNames.CLEAR_FILE_LIST:
        		return [];
        default:
            return state;
    }
}