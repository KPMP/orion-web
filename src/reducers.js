import { combineReducers } from 'redux';
import { uploadResponse } from './actions/UploadForm/uploadResponseReducer';
import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { reducer as formReducer } from 'redux-form'


const appReducer = combineReducers({
    uploadResponse,
    form: formReducer
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }
    return appReducer(state, action);
}

export default rootReducer;
;