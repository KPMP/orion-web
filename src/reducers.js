import { combineReducers } from 'redux';
import actionNames from './actions/actionNames';
import loadedState from './initialState';
import { packages as filtering, dtds, showLargeFileModal } from './components/Packages/packagePanelReducer';
import { packageTypeIcons } from './components/Packages/packageTypeIconsReducer';
import { isUploading, formDTD } from './components/Upload/uploadFormReducer';
import { userInformation } from './components/userInformationReducer';
import { stateDisplayMap } from './components/Packages/stateDisplayMapReducer';

const appReducer = combineReducers({
    filtering,
    dtds,
    isUploading,
    formDTD,
    userInformation,
    packageTypeIcons,
    stateDisplayMap,
    showLargeFileModal
});

const rootReducer = (state, action) => {
    if(action.type === actionNames.RESET_STATE) {
        state = loadedState;
    }
    return appReducer(state, action);
}

export default rootReducer;
