import actionNames from '../../actions/actionNames';

export const sessionTimedOut = (state = false, action) => {
    switch(action.type) {
        case actionNames.SET_SESSION_TIMED_OUT:
            return action.payload;
        default:
            return state;
    }
}
