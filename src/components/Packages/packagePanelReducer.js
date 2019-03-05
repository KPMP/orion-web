import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';
import packageTypes from '../packageTypes';

export const packages = (state = {}, action) => {
	let newState = {}; 
	let filteredPackageList = state.unfiltered;
	let filters = state.filters;
	let users = state.userList;
	switch(action.type) {
		case actionNames.SET_USERS:
			newState.filtered = state.filtered;
			newState.unfiltered = state.unfiltered;
			newState.filters = state.filters;
			newState.userList = action.payload;
			newState.isQuerying = state.isQuerying;
			return newState;
		case actionNames.SET_PACKAGES:
			newState.filtered = action.payload;
			newState.unfiltered = action.payload;
			newState.filters = [];
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
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
			filteredPackageList = applyFilters(filters, filteredPackageList);
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
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
			
			filteredPackageList = applyFilters(filters, filteredPackageList);
			
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			newState.filters = filters;
			newState.userList = users;
			newState.isQuerying = state.isQuerying;
			return newState;
		case actionNames.SET_IS_QUERYING:
			newState.filtered = state.filtered;
			newState.unfiltered = state.unfiltered;
			newState.filters = state.filters;
			newState.userList = state.userList;
			newState.isQuerying = action.payload;
			return newState;
		default:
			return state;
	}
}

const applyFilters = (filters, filteredPackageList) => {
	let predefinedPackageTypes = [];
	packageTypes.options.map((option, index) => {
		return predefinedPackageTypes.push(option.value);
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
					if (!predefinedPackageTypes.includes(packageItem.packageInfo.packageType) ) {
						return packageItem;
					}
				}
				else if(packageItem.packageInfo.packageType === filter.value) {
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