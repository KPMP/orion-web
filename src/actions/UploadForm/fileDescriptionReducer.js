import actionNames from '../actionNames';

export const fileDescription = (state = "", action) => {
    switch(action.type) {
        case actionNames.UPDATE_FILE_DESCRIPTION:
            return action.payload;
        default:
            return state;
    }
}