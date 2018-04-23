import { combineReducers } from 'redux';
import { filesToUpload } from './actions/UploadForm/filesToUploadReducer';
import { fileDescription } from './actions/UploadForm/fileDescriptionReducer';
import { fileList } from './actions/UploadForm/fileListReducer';
import { uploadResponse } from './actions/UploadForm/uploadResponseReducer';
import { storedFiles } from './actions/UploadForm/uploadStoredFilesReducer';


import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { reducer as formReducer } from 'redux-form'


const appReducer = combineReducers({
    uploadResponse,
    form: formReducer,
    filesToUpload,
    fileDescription,
    fileList,
    storedFiles
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }
    return appReducer(state, action);
}

export default rootReducer;
