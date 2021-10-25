import actionNames from '../actionNames';

export const setSessionStart = (sessionStart) => {
    return {
        type: actionNames.SET_SESSION_START,
        payload: sessionStart
    }
};