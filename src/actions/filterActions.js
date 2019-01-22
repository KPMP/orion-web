//import Api from '../helpers/Api';
import actionNames from './actionNames';

//const api = Api.getInstance();

export const filterTypes = {
	INSTITUTION: "INSTITUTION",
	PACKAGE_TYPE: "PACKAGE_TYPE",
	SUBMITTER: "SUBMITTER"
}

export const addFilter = (type, value) => {
	return {
		type: actionNames.ADD_FILTER,
		payload: { filterType: type, value: value }
	}
}

export const removeFilter = (type, value) => {
	return {
		type: actionNames.REMOVE_FILTER,
		payload: { filterType: type, value: value }
	}
}