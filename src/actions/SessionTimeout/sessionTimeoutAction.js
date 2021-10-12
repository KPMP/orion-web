import actionNames from '../actionNames';

export const sessionTimedOut = (isTimedOut) => {
    return {
        type: actionNames.SET_SESSION_TIMED_OUT,
        payload: isTimedOut
    }
};

export const startTimer = (dispatch) => {
    var highestTimeoutId = setTimeout(';');
    for (var i=0; i< highestTimeoutId; i++) {
        clearTimeout(i);
    }
    setTimeout(function() {
            dispatch(sessionTimedOut(true));
    },  5 * 60 * 1000);
};