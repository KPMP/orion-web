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
			let unFilteredPackageList = state.unfiltered;
			let filteredPackageList = {}
			let filters = state.filters;
			filters.push(action.payload);
			newState.filters = filters;
			filters.map((filter, index) => {
				
				if (filter.filterType === filterActions.filterTypes.INSTITUTION) {
					filteredPackageList = unFilteredPackageList.filter((packageItem, index) => {
						if(packageItem.packageInfo.institution === action.payload.value) {
							return packageItem;
						}
						return null;
					});
				} 
				else if (filter.filterType === filterActions.filterTypes.PACKAGE_TYPE) {
					filteredPackageList = unFilteredPackageList.filter((packageItem, index) => {
						if(packageItem.packageInfo.packageType === action.payload.value) {
							return packageItem;
						}
						return null;
					});
				}
				else if (filter.filterType === filterActions.filterTypes.SUBMITTER) {
					filteredPackageList = unFilteredPackageList.filter((packageItem, index) => {
						if(packageItem.packageInfo.submitter.id === action.payload.value) {
							return packageItem;
						}
						return null;
					});
				}
			})
			newState.unfiltered = state.unfiltered;
			newState.filtered = filteredPackageList;
			return newState;
		default:
			return state;
	}
}