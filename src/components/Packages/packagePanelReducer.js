import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';

export const dtds = ( state = {}, action ) => {
	let newState = state;
	switch (action.type) {
		case actionNames.ADD_DTD:
			let version = action.payload.version;
			newState[version] = action.payload;
			return newState;
		default:
			return state;
	
	}
};

export const showLargeFileModal = (state = "", action) => {
	let newState = "";
	let showLargeFileModal = action.payload;
	switch(action.type) {
		case actionNames.SET_SHOW_LARGE_FILE_MODAL:
			newState = showLargeFileModal;
			return newState;
		case actionNames.CLEAR_SHOW_LARGE_FILE_MODAL:
			return newState;
		default:
			return state;
	}
};

export const refreshPackages = (state = false, action) => {

	let newState = {...state};
	switch(action.type) {
		case actionNames.SET_REFRESH_PACKAGES:
			newState = action.payload;
			return newState;
		default:
			return state;
	}

};

export const filtering = (state = {}, action) => {
	let newState = {}; 
	let filters = state.filters;
	let users = state.userList;
	let packageTypes = state.packageTypes;
    let studyNames = state.studyNames;
    let biopsyIds = state.biopsyIds;
    let siteNames = state.siteNames;

	switch(action.type) {

		case actionNames.SET_USERS:
			newState.filters = state.filters;
			newState.userList = action.payload;
			newState.siteNames = siteNames;
			newState.packageTypes = state.packageTypes;
            newState.studyNames = studyNames;
            newState.biopsyIds = state.biopsyIds;
			return newState;

		case actionNames.SET_PACKAGE_TYPES:
			newState.filters = state.filters;
			newState.userList = users;
			newState.siteNames = siteNames;
			newState.packageTypes = action.payload;
            newState.studyNames = studyNames;
            newState.biopsyIds = state.biopsyIds;
			return newState;
			
		case actionNames.SET_SITE_NAMES:
			newState.filters = state.filters;
			newState.userList = users;
			newState.packageTypes = packageTypes;
            newState.siteNames = action.payload
            newState.studyNames = studyNames;
            newState.biopsyIds = biopsyIds;
			return newState;
        
        case actionNames.SET_STUDY_NAMES:
			newState.filters = state.filters;
			newState.userList = users;
			newState.packageTypes = packageTypes;
			newState.siteNames = siteNames;
            newState.studyNames = action.payload;
            newState.biopsyIds = state.biopsyIds;
			return newState;

        case actionNames.SET_BIOPSY_IDS:
            newState.filters = state.filters;
            newState.userList = users;
            newState.packageTypes = packageTypes;
            newState.siteNames = siteNames;
            newState.studyNames = studyNames;
            newState.biopsyIds = action.payload;
            return newState;

		case actionNames.REMOVE_FILTER:
			if (filters.length > 0) {
				filters.map((filter, index) => {
					if (filter.filterType === action.payload.filterType) {
						filters.splice(index, 1);
					}
					return filters;
				});
			}

			newState.filters = filters;
			newState.userList = users;
			newState.packageTypes = state.packageTypes;
			newState.siteNames = state.siteNames;
            newState.studyNames = state.studyNames;
            newState.biopsyIds = state.biopsyIds;
			return newState;

		case actionNames.ADD_FILTER:
			let filterAdded = false;
			if (filters.length > 0) {
				filters.map((filter, index) => {
					if (filter.filterType === action.payload.filterType && !filterAdded) {
						filters.splice(index, 1, action.payload);
						filterAdded = true;
					}
					return filters;
				})
				
			} 
			if (!filterAdded) {
				filters.push(action.payload);
			}

			newState.filters = filters;
			newState.userList = users;
			newState.packageTypes = state.packageTypes;
			newState.siteNames = state.siteNames;
            newState.studyNames = state.studyNames;
            newState.biopsyIds = state.biopsyIds;
			return newState;
		default:
			return state;
	}
};

export const applyFilters = (filters, filteredPackageList, predefinedPackageTypes) => {

	let packageTypesLower = predefinedPackageTypes.map(packageType => {
		return packageType.toLowerCase();
	});
	filters.map((filter, index) => {
		if (filter.filterType === filterActions.filterTypes.SITE_NAME) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.siteName === filter.value) {
					return packageItem;
				}
				return null;
			});
		} 
		else if (filter.filterType === filterActions.filterTypes.PACKAGE_TYPE) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(filter.value === 'Other') {
					if (!packageTypesLower.includes(packageItem.packageInfo.packageType.toLowerCase()) ) {
						return packageItem;
					}
				}
				else if(packageItem.packageInfo.packageType.toLowerCase() === filter.value.toLowerCase()) {
					return packageItem;
				}
				return null;
			});
		}
		else if (filter.filterType === filterActions.filterTypes.SUBMITTER) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.submitter.id === filter.value) {
					return packageItem;
				}
				return null;
			});
		}

        else if (filter.filterType === filterActions.filterTypes.STUDY) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.submitter.id === filter.value) {
					return packageItem;
				}
				return null;
			});
		}

        else if (filter.filterType === filterActions.filterTypes.BIOPSY_ID) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.submitter.id === filter.value) {
					return packageItem;
				}
				return null;
			});
		}
		return filteredPackageList;
	});
	return filteredPackageList;
};
