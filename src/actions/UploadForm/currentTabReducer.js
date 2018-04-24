import actionNames from '../actionNames';

export const currentTab = (state = 0, action) => {
    switch(action.type) {
        case actionNames.CHANGE_UPLOAD_TAB:
            return action.payload;
        default:
            return state;
    }
}
