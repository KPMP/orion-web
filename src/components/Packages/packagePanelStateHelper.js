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

const protectedAndMine = (panelConfig, currentEmail, packageEmail) => {
	return panelConfig.iconInfo.isProtected && isMine(currentEmail, packageEmail);
};

export const getIcon = (state, isLargeFile, currentEmail, packageEmail) => {
	let panelConfig = PANEL_CONFIGS[state];
	if (panelConfigIconExists(panelConfig) && (protectedAndMine(panelConfig ,currentEmail, packageEmail) || !panelConfig.iconInfo.isProtected)) {
		if ((panelConfig.iconInfo.isLargeFileOnly && isLargeFile) || !panelConfig.iconInfo.isLargeFileOnly) {
			return panelConfig.iconInfo.type;
		}
	} 
};

export const getMessage = (baseConfig, state, isLargeFile, currentEmail, packageEmail) => {
	let message = baseConfig.message;
	if (isLargeFile && state === 'METADATA_RECEIVED') {
		if (isMine(currentEmail, packageEmail)) {
			message = baseConfig.myLargeFileUploadMessage;
		} else {
			message = baseConfig.notMyLargeFileUploadMessage;
		}
	} else if (!isLargeFile && state === 'METADATA_RECEIVED') {
		message = baseConfig.standardMessage;
	}
	return message;
};