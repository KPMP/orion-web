import Api from '../helpers/Api';
import actionNames from './actionNames';
import { sendMessageToBackend } from './Error/errorActions';

const api = Api.getInstance();

export const filterTypes = {
	TIS_NAME: "TIS_NAME",
	SITE_NAME: "SITE_NAME",
	PACKAGE_TYPE: "PACKAGE_TYPE",
	SUBMITTER: "SUBMITTER",
    STUDY: "STUDY",
	BIOPSY_ID: "BIOPSY_ID",
    UPLOAD_STATE: "UPLOAD_STATE"
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

export const setBiopsyIds = (packages) => {
	let uniqueBiopsyIds = [...new Set(packages.map(item => item.packageInfo.biopsyId))];
	return {
		type: actionNames.SET_BIOPSY_IDS,
		payload: uniqueBiopsyIds
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


export const setStudyNamesFromDTD = (formDTD) => {
	let studyNameFieldArray = formDTD.standardFields.fields.filter(field => {
		return field.hasOwnProperty("fieldName") && field.fieldName === "study"
	});
	let studyNames = studyNameFieldArray[0].values;
	return {
		type: actionNames.SET_STUDY_NAMES,
		payload: studyNames
	}
}
