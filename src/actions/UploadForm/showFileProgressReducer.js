import actionNames from '../actionNames';

export const showFileProgressModal = (state = true, action) => {
    switch(action.type) {
        case actionNames.SHOW_FILE_PROGRESS_MODAL:
            return action.payload;
        default:
            return state;
    }

}