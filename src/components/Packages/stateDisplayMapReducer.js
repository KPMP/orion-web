import actionNames from '../../actions/actionNames';

export const stateDisplayMap = (state = {}, action) => {
    let newState = {};
    let stateDisplayMap = action.payload;
    switch (action.type) {
        case actionNames.SET_STATE_DISPLAY_MAP:
            newState = stateDisplayMap;
            return newState;
        default:
            return state;
    };
};