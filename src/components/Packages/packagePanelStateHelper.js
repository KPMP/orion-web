import { faClock, faDownload } from '@fortawesome/free-solid-svg-icons';
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

const protectedAndMine = (panelConfig, currentEmail, packageEmail) => {
	return panelConfig.iconInfo.isProtected && isMine(currentEmail, packageEmail);
};

export const getIcon = (state, isLargeFile, currentEmail, packageEmail, stateDisplayMap) => {
	let panelConfig = PANEL_CONFIGS[state];
	if (panelConfigIconExists(panelConfig) && (protectedAndMine(panelConfig ,currentEmail, packageEmail) || !panelConfig.iconInfo.isProtected)) {
		if ((panelConfig.iconInfo.isLargeFileOnly && isLargeFile) || !panelConfig.iconInfo.isLargeFileOnly) {
			return panelConfig.iconInfo.type;
		}
	} 
	
	let stateDisplay = stateDisplayMap.filter(function(stateDisplayItem) {
		if (stateDisplayItem.apps.dlu.showDownload === true && stateDisplayItem.state === state) {
			return stateDisplayItem;
		} else {
			return null;
		}
    	
    }, state);
	
	if (stateDisplay.length === 1) {
		return faDownload;
	}
};

export const getClickEvent = (state, stateDisplayMap, stateInfoClick, downloadClick) => {
	let stateDisplay = stateDisplayMap.filter(function(stateDisplayItem) {
		if (stateDisplayItem.apps.dlu.showDownload === true && stateDisplayItem.state === state) {
			return stateDisplayItem;
		} else {
			return null;
		}
    	
    }, state);
	
	if (stateDisplay.length === 1) {
		return downloadClick;
	} else {
		return stateInfoClick;
	};
}

export const getMessage = (state, isLargeFile, currentEmail, packageEmail) => {
	if (isLargeFile && state === 'METADATA_RECEIVED') {
		if (isMine(currentEmail, packageEmail)) {
			return PANEL_CONFIGS[state].myLargeFileUploadMessage;
		} else {
			return PANEL_CONFIGS[state].notMyLargeFileUploadMessage;
		}
	} else if (!isLargeFile && state === 'METADATA_RECEIVED') {
		return PANEL_CONFIGS[state].standardMessage;
	} else if (state in PANEL_CONFIGS) {
		return PANEL_CONFIGS[state].message;
	}
	return '';
};

export const getDisplayInfo = (state, stateDisplayMap) => {
    let stateDisplayText = stateDisplayMap.filter(function(stateDisplayItem) {
    	if(stateDisplayItem.state === state) {
    		return stateDisplayItem;
    	} 
    }, state);
    if (stateDisplayText) {
    	return stateDisplayText[0];
    } 
};