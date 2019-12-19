import { faClock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text: 'Finishing upload',
        classNames: 'alert-success',
        message: 'The file(s) in this package are being finalized.  Once completed, they will be available for download.'
    },

    METADATA_RECEIVED: {
        text: 'Waiting for files...',
        classNames: 'alert-primary',
        iconInfo: { type: faClock, isProtected: true, isLargeFileOnly: true },
        myLargeFileUploadMessage: 'Awaiting file(s) to be uploaded. Click the clock icon for upload instructions.',
        notMyLargeFileUploadMessage: 'Awaiting file(s) to be uploaded.',
        standardMessage: 'Waiting for file(s) to finish uploading.'
    },
    
    UPLOAD_FAILED: {
    	text: 'Upload failed',
    	classNames: 'alert-danger',
    	message: <div>
					<div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div>
					<br/>
					<div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div>
				</div>
    		
    }
};

const isMine = (currentShibId, packageShibId) => {
	return currentShibId === packageShibId;
};

const panelConfigIconExists = (panelConfig) => {
	return panelConfig && panelConfig.iconInfo;
};

const protectedAndMine = (panelConfig, currentShibId, packageShibId) => {
	return panelConfig.iconInfo.isProtected && isMine(currentShibId, packageShibId);
};

export const getIcon = (state, isLargeFile, currentShibId, packageShibId, packageId) => {
	let panelConfig = PANEL_CONFIGS[state];
	if (panelConfigIconExists(panelConfig) && (protectedAndMine(panelConfig ,currentShibId, packageShibId) || !panelConfig.iconInfo.isProtected)) {
		if ((panelConfig.iconInfo.isLargeFileOnly && isLargeFile) || !panelConfig.iconInfo.isLargeFileOnly) {
			return panelConfig.iconInfo.type;
		}
	} 
};

export const getMessage = (baseConfig, state, isLargeFile, currentShibId, packageShibId) => {
	let message = baseConfig.message;
	if (isLargeFile && state === 'METADATA_RECEIVED') {
		if (isMine(currentShibId, packageShibId)) {
			message = baseConfig.myLargeFileUploadMessage;
		} else {
			message = baseConfig.notMyLargeFileUploadMessage;
		}
	} else if (!isLargeFile && state === 'METADATA_RECEIVED') {
		message = baseConfig.standardMessage;
	}
	return message;
};