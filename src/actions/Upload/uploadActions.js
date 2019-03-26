import Api from '../../helpers/Api';
import actionNames from '../actionNames';
import { handleError } from '../Error/errorActions';
import { setPackageTypesFromDTD } from '../filterActions.js';

const api = Api.getInstance();

export const setFormDTD = (formDTD) => {
	return {
		type: actionNames.SET_FORM_DTD,
		payload: formDTD
	}
}

export const setFormForVersion = (dtd) => {
	return {
		type: actionNames.SET_FORM_FOR_VERSION,
		payload: dtd
	}
}

export const getFormDTD = () => {
	return (dispatch) => {
		api.get('/api/v1/form')
			.then(res => {
				dispatch(setFormDTD(res.data));
				dispatch(setPackageTypesFromDTD(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(handleError());
			});
	}
}

export const getFormDTDByVersion = (version) => {
	return(dispatch) => {
		api.get('/api/v1/form/version/' + version )
			.then(res => {
				dispatch(setFormForVersion(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(handleError());
			});
	}
}