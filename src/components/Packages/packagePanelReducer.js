import actionNames from '../../actions/actionNames';
import * as filterActions from '../../actions/filterActions';

export const packages = (state = {}, action) => {
	let newState = {}; 
	switch(action.type) {
		case actionNames.SET_PACKAGES:
			newState.filtered = action.payload;
			newState.unfiltered = action.payload;
			newState.filters = [];
			return newState;
		case actionNames.ADD_FILTER:
			let filteredPackageList = state.filtered;
			if (action.payload.filterType === filterActions.filterTypes.INSTITUTION) {
				filteredPackageList = filteredPackageList.filter((packageItem, index, filteredPackageList) => {
					if(packageItem.packageInfo.institution === action.payload.value) {
						return packageItem;
					}
					return null;
				});
			} 
			else if (action.payload.filterType === filterActions.filterTypes.PACKAGE_TYPE) {
				filteredPackageList = filteredPackageList.filter((packageItem, index, filteredPackageList) => {
					if(packageItem.packageInfo.packageType === action.payload.value) {
						return packageItem;
					}
					return null;
				});
			}
			else if (action.payload.filterType === filterActions.filterTypes.SUBMITTER) {
				filteredPackageList = filteredPackageList.filter((packageItem, index, filteredPackageList) => {
					if(packageItem.packageInfo.submitter.id === action.payload.value) {
						return packageItem;
					}
					return null;
				});
			}
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			let filters = state.filters;
			filters.push(action.payload);
			newState.filters = filters;
			return newState;
		default:
			return state;
	}
}