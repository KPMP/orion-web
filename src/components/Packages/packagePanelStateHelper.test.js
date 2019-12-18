import { getIcon, getMessage, PANEL_CONFIGS } from './packagePanelStateHelper';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

describe('getIcon', () => {
	
	it('should not return an icon for a state not in PANEL_CONFIGS', () => {
		let icon = getIcon('UPLOAD_SUCCESSFUL', false, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for FILES_RECEIVED state', () => {
		let icon = getIcon('FILES_RECEIVED', false, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for FILES_RECEIVED state, when shibIds do not match', () => {
		let icon = getIcon('FILES_RECEIVED', false, 'abc', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for FILES_RECEIVED state, when large file upload', () => {
		let icon = getIcon('FILES_RECEIVED', true, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for UPLOAD_FAILED state', () => {
		let icon = getIcon('UPLOAD_FAILED', false, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for UPLOAD_FAILED state when shibIds do not match', () => {
		let icon = getIcon('UPLOAD_FAILED', false, 'abc', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should not return an icon for UPLOAD_FAILED state whenis large file', () => {
		let icon = getIcon('UPLOAD_FAILED', true, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should return faclock when METADATA_RECEIVED and it is my large file upload', () => {
		let icon = getIcon('METADATA_RECEIVED', true, 'xyz', 'xyz');
		expect(icon).toBe(faClock);
	});
	
	it('should return undefined when METADATA_RECEIVED and shibIds match, but not large file', () => {
		let icon = getIcon('METADATA_RECEIVED', false, 'xyz', 'xyz');
		expect(icon).toBe(undefined);
	});
	
	it('should return undefined when METADATA_RECEIVED and shibIds do not match and is large file', () => {
		let icon = getIcon('METADATA_RECEIVED', true, 'abc', 'xyz');
		expect(icon).toBe(undefined);
	});
});

describe('getMessage', () => {
	
	it('should return the correct message for FILES_RECEIVED when large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['FILES_RECEIVED'];
		let message = getMessage(baseConfig, 'FILES_RECEIVED', true, 'abc', 'abc');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for FILES_RECEIVED when not large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['FILES_RECEIVED'];
		let message = getMessage(baseConfig, 'FILES_RECEIVED', false, 'abc', 'abc');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	it('should return the correct message for FILES_RECEIVED when large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['FILES_RECEIVED'];
		let message = getMessage(baseConfig, 'FILES_RECEIVED', true, 'abc', 'def');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for FILES_RECEIVED when not large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['FILES_RECEIVED'];
		let message = getMessage(baseConfig, 'FILES_RECEIVED', false, 'abc', 'def');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for UPLOAD_FAILED when is not large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['UPLOAD_FAILED'];
		let message = getMessage(baseConfig, 'UPLOAD_FAILED', false, 'abc', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['UPLOAD_FAILED'];
		let message = getMessage(baseConfig, 'UPLOAD_FAILED', true, 'abc', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is not large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['UPLOAD_FAILED'];
		let message = getMessage(baseConfig, 'UPLOAD_FAILED', false, 'def', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['UPLOAD_FAILED'];
		let message = getMessage(baseConfig, 'UPLOAD_FAILED', true, 'def', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for METADATA_RECEIVED when is not large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['METADATA_RECEIVED'];
		let message = getMessage(baseConfig, 'METADATA_RECEIVED', false, 'abc', 'abc');
		expect(message).toBe('Waiting for file(s) to finish uploading.');
	});
	
	it('should return the correct message for METADATA_RECEIVED when is large file and is mine', () => {
		let baseConfig = PANEL_CONFIGS['METADATA_RECEIVED'];
		let message = getMessage(baseConfig, 'METADATA_RECEIVED', true, 'abc', 'abc');
		expect(message).toBe('Awaiting file(s) to be uploaded. Click the clock icon for upload instructions.')
	});
	
	it('should return the correct message for METADATA_RECEIVED when is not large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['METADATA_RECEIVED'];
		let message = getMessage(baseConfig, 'METADATA_RECEIVED', false, 'def', 'abc');
		expect(message).toBe('Waiting for file(s) to finish uploading.');
	});
	
	it('should return the correct message for METADATA_RECEIVED when is large file and is not mine', () => {
		let baseConfig = PANEL_CONFIGS['METADATA_RECEIVED'];
		let message = getMessage(baseConfig, 'METADATA_RECEIVED', true, 'def', 'abc');
		expect(message).toBe('Awaiting file(s) to be uploaded.');
	});
	

	
	
});
