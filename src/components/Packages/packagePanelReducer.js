import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';

export const packages = (state = {}, action) => {
	let newState = {}; 
	let filteredPackageList = state.unfiltered;
	let filters = state.filters;
	let users = state.userList;
	let packageTypes = state.packageTypes;
	switch(action.type) {
		case actionNames.SET_USERS:
			newState.filtered = state.filtered;
			newState.unfiltered = state.unfiltered;
			newState.filters = state.filters;
			newState.userList = action.payload;
			newState.isQuerying = state.isQuerying;
			newState.packageTypes = state.packageTypes;
			return newState;
		case actionNames.SET_PACKAGE_TYPES:
			newState.filtered = state.filtered;
			newState.unfiltered = state.unfiltered;
			newState.filters = state.filters;
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
			newState.packageTypes = action.payload;
			return newState;
		case actionNames.SET_PACKAGES:
			newState.filtered = action.payload;
			newState.unfiltered = action.payload;
			newState.filters = [];
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
			newState.packageTypes = state.packageTypes;
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
			filteredPackageList = applyFilters(filters, filteredPackageList, packageTypes);
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
			newState.packageTypes = state.packageTypes;
			return newState;
		case actionNames.ADD_FILTER:

			var filterAdded = false;
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
			
			filteredPackageList = applyFilters(filters, filteredPackageList, packageTypes);
			
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			newState.userList = users;
			newState.packageTypes = state.packageTypes;
			newState.isQuerying = state.isQuerying;
			return newState;
		case actionNames.SET_IS_QUERYING:
			newState.filtered = state.filtered;
			newState.unfiltered = state.unfiltered;
			newState.filters = state.filters;
			newState.userList = state.userList;
			newState.isQuerying = action.payload;
			newState.packageTypes = state.packageTypes;
			return newState;
		default:
			return state;
	}
}

const applyFilters = (filters, filteredPackageList, predefinedPackageTypes) => {

	let packageTypesLower = predefinedPackageTypes.map(packageType => {
		return packageType.toLowerCase();
	});
	filters.map((filter, index) => {
		if (filter.filterType === filterActions.filterTypes.INSTITUTION) {
			filteredPackageList = filteredPackageList.filter((packageItem, index) => {
				if(packageItem.packageInfo.institution === filter.value) {
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
		return filteredPackageList;
	});
	return filteredPackageList;
}