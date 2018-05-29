import { combineReducers } from 'redux';
import { uploadedFiles } from './components/uploadedFilesReducer';
import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { reducer as formReducer } from 'redux-form';
import { uploadDialog } from './components/UploadModal/uploadDialogReducer';


const appReducer = combineReducers({
    form: formReducer,
    uploadedFiles,
    uploadDialog
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }
    return appReducer(state, action);
}

export default rootReducer;
