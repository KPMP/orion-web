import actionNames from '../../actions/actionNames';

export const packageTypeIcons = (state = [], action) => {
    let newState = [];
    let packageTypeIcons = action.payload;
    switch (action.type) {
        case actionNames.SET_PACKAGE_TYPE_ICONS:
            newState = packageTypeIcons;
            return newState;
        default:
            return state;
    }
}