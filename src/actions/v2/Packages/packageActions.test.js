import actionNames from '../../actionNames';
import { setPackages, showPackageAttachments } from './packageActions';

describe ('setPackages', () => {
	it('should create the correct action', () => {
		let expectedAction = {
			type: actionNames.SET_PACKAGES,
			payload: "stuff"
		}
		expect(setPackages("stuff")).toEqual(expectedAction);
	})
});

describe ('showPackageAttachments', () => {
	it('should create the correct action', () => {
		let attachments = [{id: "1", filename: "file"}];
		let expectedAction = {
			type: actionNames.SHOW_PACKAGE_ATTACHMENTS,
			payload: attachments
		}
		expect(showPackageAttachments(attachments)).toEqual(expectedAction);
	});
});