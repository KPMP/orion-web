import actionNames from '../../actions/actionNames';

export const sessionStart = (state = '', action) => {
    switch(action.type) {
        case actionNames.SET_SESSION_START:
            return action.payload;
        default:
            return state;
    }
}
