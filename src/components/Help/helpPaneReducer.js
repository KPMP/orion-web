import actionNames from '../../actions/actionNames';

export const help = (state = {}, action) => {

    let newState = {};

    switch(action.type) {
        case actionNames.SET_RELEASES:
            newState.releases = action.payload;
            return newState;

        default:
            return state;
    }
};