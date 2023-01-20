import { getIcon, getMessage, getClickEvent, getDisplayInfo } from './packagePanelStateHelper';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

describe('getIcon', () => {
	let stateDisplayMap;
	beforeEach(() => {
		stateDisplayMap = [{state: 'UPLOAD_SUCCEEDED', apps: { dlu: { 'showDownload': true }}}];
	});
	
	it('should not return an icon for FILES_RECEIVED state', () => {
		let icon = getIcon('FILES_RECEIVED', false, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should not return an icon for FILES_RECEIVED state, when shibIds do not match', () => {
		let icon = getIcon('FILES_RECEIVED', false, 'abc', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should not return an icon for FILES_RECEIVED state, when large file upload', () => {
		let icon = getIcon('FILES_RECEIVED', true, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should not return an icon for UPLOAD_FAILED state', () => {
		let icon = getIcon('UPLOAD_FAILED', false, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should not return an icon for UPLOAD_FAILED state when shibIds do not match', () => {
		let icon = getIcon('UPLOAD_FAILED', false, 'abc', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should not return an icon for UPLOAD_FAILED state whenis large file', () => {
		let icon = getIcon('UPLOAD_FAILED', true, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should return faclock when METADATA_RECEIVED and it is my large file upload', () => {
		let icon = getIcon('METADATA_RECEIVED', true, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBe(faClock);
	});
	
	it('should return undefined when METADATA_RECEIVED and shibIds match, but not large file', () => {
		let icon = getIcon('METADATA_RECEIVED', false, 'xyz', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
	
	it('should return undefined when METADATA_RECEIVED and shibIds do not match and is large file', () => {
		let icon = getIcon('METADATA_RECEIVED', true, 'abc', 'xyz', stateDisplayMap);
		expect(icon).toBeUndefined();
	});
});

describe('getMessage', () => {
	
	it('should return the correct message for FILES_RECEIVED when large file and is mine', () => {
		let message = getMessage('FILES_RECEIVED', true, 'abc', 'abc');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for FILES_RECEIVED when not large file and is mine', () => {
		let message = getMessage('FILES_RECEIVED', false, 'abc', 'abc');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	it('should return the correct message for FILES_RECEIVED when large file and is not mine', () => {
		let message = getMessage('FILES_RECEIVED', true, 'abc', 'def');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for FILES_RECEIVED when not large file and is not mine', () => {
		let message = getMessage('FILES_RECEIVED', false, 'abc', 'def');
		expect(message).toBe('The file(s) in this package are being finalized.  Once completed, they will be available for download.');
	});
	
	it('should return the correct message for UPLOAD_FAILED when is not large file and is mine', () => {
		let message = getMessage('UPLOAD_FAILED', false, 'abc', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is large file and is mine', () => {
		let message = getMessage('UPLOAD_FAILED', true, 'abc', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is not large file and is not mine', () => {
		let message = getMessage('UPLOAD_FAILED', false, 'def', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for UPLOAD_FAILED when is large file and is not mine', () => {
		let message = getMessage('UPLOAD_FAILED', true, 'def', 'abc');
		let expectedMessage = <div><div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div><br/><div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div></div>;
		expect(message).toEqual(expectedMessage);
	});
	
	it('should return the correct message for METADATA_RECEIVED when is not large file and is mine', () => {
		let message = getMessage('METADATA_RECEIVED', false, 'abc', 'abc');
		expect(message).toBe('Waiting for file(s) to finish uploading.');
	});
	
	it('should return the correct message for METADATA_RECEIVED when is large file and is mine', () => {
		let message = getMessage('METADATA_RECEIVED', true, 'abc', 'abc');
		expect(message).toBe('Awaiting file(s) to be uploaded. Click the clock icon for upload instructions.');
	});
	
	it('should return the correct message for METADATA_RECEIVED when is not large file and is not mine', () => {
		let message = getMessage('METADATA_RECEIVED', false, 'def', 'abc');
		expect(message).toBe('Waiting for file(s) to finish uploading.');
	});
	
	it('should return the correct message for METADATA_RECEIVED when is large file and is not mine', () => {
		let message = getMessage('METADATA_RECEIVED', true, 'def', 'abc');
		expect(message).toBe('Awaiting file(s) to be uploaded.');
	});
	
	it('should return a blank string for state without message', () => {
		let message = getMessage('ANOTHER_STATE', true, 'def', 'def');
		expect(message).toBe('');
	});
	
});

describe('getDisplayInfo', () => {
	
	it('should return the correct info object for the given state', () => {
		let stateDisplayMap = [{state: 'UPLOAD_SUCCEEDED', apps: { dlu: { 'showDownload': true }}},
			{state: 'UPLOAD_FAILED', apps: { dlu: { 'showDownload': false }}}];
		let stateInfo = getDisplayInfo('UPLOAD_FAILED', stateDisplayMap);
		expect(stateInfo).toStrictEqual({state: 'UPLOAD_FAILED', apps: { dlu: { 'showDownload': false }}});
	});
	
	it('should return undefined if the given state is not found', () => {
		let stateDisplayMap = [{state: 'UPLOAD_SUCCEEDED', apps: { dlu: { 'showDownload': true }}},
			{state: 'UPLOAD_FAILED', apps: { dlu: { 'showDownload': false }}}];
		let stateInfo = getDisplayInfo('UNKNOWN_STATE', stateDisplayMap);
		expect(stateInfo).toBeUndefined();
	});
	
});