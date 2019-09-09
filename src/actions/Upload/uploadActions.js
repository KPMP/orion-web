import Api from '../../helpers/Api';
import actionNames from '../actionNames';
import { sendMessageToBackend } from '../Error/errorActions';
import { setPackageTypesFromDTD, setTisNamesFromDTD } from '../filterActions.js';

const api = Api.getInstance();

export const setFormDTD = (formDTD) => {
	return {
		type: actionNames.SET_FORM_DTD,
		payload: formDTD
	}
}

export const getFormDTD = () => {
	return (dispatch) => {
		api.get('/api/v1/form')
			.then(res => {
				dispatch(setFormDTD(res.data));
				dispatch(setPackageTypesFromDTD(res.data));
				dispatch(setTisNamesFromDTD(res.data));
			})
			.catch(err => {
				dispatch(sendMessageToBackend(err));
			});
	}
}