import { combineReducers } from 'redux';
import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { packages } from './components/v2/Packages/packagePanelReducer';
import { isUploading } from './components/v2/Upload/uploadFormReducer';
import { userInformation } from './components/v2/userInformationReducer';

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
