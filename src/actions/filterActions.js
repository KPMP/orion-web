import Api from '../helpers/Api';
import actionNames from './actionNames';
import { sendMessageToBackend } from './Error/errorActions';

const api = Api.getInstance();

export const filterTypes = {
	TIS_NAME: "TIS_NAME",
	SITE_NAME: "SITE_NAME",
	PACKAGE_TYPE: "PACKAGE_TYPE",
	SUBMITTER: "SUBMITTER",
    STUDY: "STUDY"
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
        let site = ""
        if (field.fieldName === "siteNeptune"){
            site = "siteNeptune";
        }else if (field.fieldName === "siteCuregn" ){
            site = "siteCuregn"
        }else if (field.fieldName === "siteCuregnDiabetes"){
            site = "siteCuregnDiabetes"
        }else if (field.fieldName === "siteNeptune"){
            site = "siteNeptune"
        }

		return field.hasOwnProperty("fieldName") && field.fieldName === site
	});
	let siteNames = siteNameFieldArray[0].values;
	return {
		type: actionNames.SET_SITE_NAMES,
		payload: siteNames
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