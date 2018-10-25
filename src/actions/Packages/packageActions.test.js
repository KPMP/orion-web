import actionNames from '../actionNames';
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
