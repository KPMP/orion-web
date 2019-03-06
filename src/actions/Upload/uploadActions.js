import Api from '../../helpers/Api';
import actionNames from '../actionNames';
import { handleError } from '../Error/errorActions';

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
			})
			.catch(err => {
				console.log(err);
				handleError();
			});
	}
}