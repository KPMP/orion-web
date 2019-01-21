import Api from '../helpers/Api';
import actionNames from './actionNames';

const api = Api.getInstance();

const filterTypes = {
	INSTITUTION: "INSTITUTION",
	PACKAGE_TYPE: "PACKAGE_TYPE",
	SUBMITTER: "SUBMITTER"
}

const addFilter = (type, value) => {
	return {
		type: actionNames.ADD_FILTER,
		payload: { filterType: type, value: value }
	}
}

module.exports = {
	addFilter: addFilter,
	filterTypes: filterTypes
}