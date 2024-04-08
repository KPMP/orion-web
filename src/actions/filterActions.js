import Api from '../helpers/Api';
import actionNames from './actionNames';
import { sendMessageToBackend } from './Error/errorActions';

const api = Api.getInstance();

export const filterTypes = {
	SITE_NAME: "SITE_NAME",
	PACKAGE_TYPE: "PACKAGE_TYPE",
	SUBMITTER: "SUBMITTER"
}

export const addFilter = (type, value) => {
	return {
		type: actionNames.ADD_FILTER,
		payload: { filterType: type, value }
	}
}

export const removeFilter = (type, value) => {
	return {
		type: actionNames.REMOVE_FILTER,
		payload: { filterType: type, value }
	}
}

export const getUsers = () => {
	return (dispatch) => {
		api.get('/api/v1/users?hasPackage=true')
			.then(res => {
				dispatch(setUsers(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(sendMessageToBackend(err));
			});
	}
}

export const setUsers = (userList) => {
	return {
		type: actionNames.SET_USERS,
		payload: userList
	}
}

export const setPackageTypesFromDTD = (formDTD) => {
	let packageTypeFieldArr = formDTD.standardFields.fields.filter(field => {
		return field.hasOwnProperty("fieldName") && field.fieldName === "packageType"
	});
	let packageTypes = packageTypeFieldArr[0].values;
	return {
		type: actionNames.SET_PACKAGE_TYPES,
		payload: packageTypes
	}
}

export const setSiteNamesFromDTD = (formDTD) => {
	let siteNameFieldArray = formDTD.standardFields.fields.filter(field => {
		return field.hasOwnProperty("fieldName") && field.fieldName === "siteName"
	});
	let siteNames = siteNameFieldArray[0].values;
	return {
		type: actionNames.SET_SITE_NAMES,
		payload: siteNames
	}
}

