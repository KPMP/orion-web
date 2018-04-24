import actionNames from '../actionNames';

export const packageInfo = (state = null, action) => {
    switch(action.type) {
        case actionNames.SET_PACKAGE_INFO:
            return action.payload;
        default:
            return state;
    }
};