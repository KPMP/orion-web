import { faClock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';


export const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        message: 'The file(s) in this package are being finalized.  Once completed, they will be available for download.'
    },

    METADATA_RECEIVED: {
        iconInfo: { type: faClock, isProtected: true, isLargeFileOnly: true },
        myLargeFileUploadMessage: 'Awaiting file(s) to be uploaded. Click the clock icon for upload instructions.',
        notMyLargeFileUploadMessage: 'Awaiting file(s) to be uploaded.',
        standardMessage: 'Waiting for file(s) to finish uploading.'
    },
    
    UPLOAD_FAILED: {
    	message: <div>
					<div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div>
					<br/>
					<div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div>
				</div>
    		
    }
    
};



const isMine = (currentEmail, packageEmail) => {
	return currentEmail === packageEmail;
};

const panelConfigIconExists = (panelConfig) => {
	return panelConfig && panelConfig.iconInfo;
};

const checkForAdmin = (currentUser, packageEmail) => {
    if(currentUser.roles = "uw_rit_kpmp_role_developer" || currentUser.email == packageEmail){
        return true;
    }else {
        return false;
    }
}

const protectedAndMine = (panelConfig, currentEmail, packageEmail) => {
	return panelConfig.iconInfo.isProtected && isMine(currentEmail, packageEmail);
};

export const getIcon = (state, isLargeFile, currentUser, packageEmail, stateDisplayMap) => {
	let panelConfig = PANEL_CONFIGS[state];
	if (panelConfigIconExists(panelConfig) && (checkForAdmin(currentUser, packageEmail) || !panelConfig.iconInfo.isProtected)) {
		if ((panelConfig.iconInfo.isLargeFileOnly && isLargeFile) || !panelConfig.iconInfo.isLargeFileOnly) {
			return panelConfig.iconInfo.type;
		}
	} 
	
};

export const getClickEvent = (state, stateDisplayMap, stateInfoClick) => {
	stateDisplayMap.filter(function(stateDisplayItem) {
		if (stateDisplayItem.state === state) {
			return stateDisplayItem;
		} else {
			return null;
		}
    	
    }, state);

	return stateInfoClick;
};

export const getMessage = (state, isLargeFile, currentEmail, packageEmail) => {
	if (isLargeFile && state === 'METADATA_RECEIVED') {
		if (isMine(currentEmail, packageEmail)) {
			// eslint-disable-next-line
			return PANEL_CONFIGS[state].myLargeFileUploadMessage;
		} else {
			// eslint-disable-next-line
			return PANEL_CONFIGS[state].notMyLargeFileUploadMessage;
		}
	} else if (!isLargeFile && state === 'METADATA_RECEIVED') {
		// eslint-disable-next-line
		return PANEL_CONFIGS[state].standardMessage;
	} else if (state in PANEL_CONFIGS) {
		// eslint-disable-next-line
		return PANEL_CONFIGS[state].message;
	}
	return '';
};

export const getDisplayInfo = (state, stateDisplayMap) => {
    let stateDisplayText = stateDisplayMap.filter(function(stateDisplayItem) {
    	if(stateDisplayItem.state === state) {
    		return stateDisplayItem;
    	} else {
    		// eslint-disable-next-line
    		return undefined;
    	}
    }, state);
    if (stateDisplayText) {
    	return stateDisplayText[0];
    } 
    // eslint-disable-next-line
    return undefined;
};