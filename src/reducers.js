import { combineReducers } from 'redux';
import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { packages } from './components/Packages/packagePanelReducer';
import { isUploading } from './components/Upload/uploadFormReducer';
import { userInformation } from './components/userInformationReducer';

const appReducer = combineReducers({
    packages,
    isUploading,
    userInformation
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }
    return appReducer(state, action);
}

export default rootReducer;
