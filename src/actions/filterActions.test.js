import * as filterActions from './filterActions';
import actionNames from './actionNames';

describe('addFilter', () => {
	it('should create the correct action', () => {
		let payload = {filterType: filterActions.filterTypes.INSTITUTION, value: 'umich'};
		let expectedAction = {
			type: actionNames.ADD_FILTER,
			payload: payload
		}
		let action = filterActions.addFilter(filterActions.filterTypes.INSTITUTION, 'umich');
		expect(action).toEqual(expectedAction);
	});
});

describe('removeFilter', () => {
	it('should create the correct action', () => {
		let payload = {filterType: filterActions.filterTypes.INSTITUTION, value: 'umich'};
		let expectedAction = {
				type: actionNames.REMOVE_FILTER,
				payload: payload
		}
		let action = filterActions.removeFilter(filterActions.filterTypes.INSTITUTION, 'umich');
		expect(action).toEqual(expectedAction);
	});
});

describe('setUsers', () => {
	it('should create the correct action', () => {
		let payload = [{user: 'johnny', id:'123'}];
		let expectedAction = {
			type: actionNames.SET_USERS,
			payload: payload
		}
		let action = filterActions.setUsers(payload);
		expect(action).toEqual(expectedAction);
	})
})

describe('setPackageTypesFromDTD', () => {
	it('should create the correct action', () => {
		let packageTypes = ["Type 1", "Type 2"];
		let payload = {
			"standardFields": {
				"fields": [
					{
						fieldName: "packageType",
						values: packageTypes
					},
					{
						fieldName: "dummyField"
					}
				]
			}
		};
		let expectedAction = {
			type: actionNames.SET_PACKAGE_TYPES,
			payload: packageTypes
		}
		let action = filterActions.setPackageTypesFromDTD(payload);
		expect(action).toEqual(expectedAction);
	})
});

describe('setSiteNamesFromDTD', () => {
	it('should create the correct action', () => {
		let siteNames = ["Type 1", "Type 2"];
		let payload = {
			"standardFields": {
				"fields": [
					{
						fieldName: "siteName",
						values: siteNames
					},
					{
						fieldName: "dummyField"
					}
				]
			}
		};
		let expectedAction = {
			type: actionNames.SET_SITE_NAMES,
			payload: siteNames
		}
		let action = filterActions.setSiteNamesFromDTD(payload);
		expect(action).toEqual(expectedAction);
	})
});

describe('setStudyNamesFromDTD', () => {
	it('should create the correct action', () => {
		let studyNames = ["Type 1", "Type 2"];
		let payload = {
			"standardFields": {
				"fields": [
					{
						fieldName: "siteName",
						values: siteNames
					},
					{
						fieldName: "dummyField"
					}
				]
			}
		};
		let expectedAction = {
			type: actionNames.SET_STUDY_NAMES,
			payload: studyNamesNames
		}
		let action = filterActions.setSiteNamesFromDTD(payload);
		expect(action).toEqual(expectedAction);
	})
});