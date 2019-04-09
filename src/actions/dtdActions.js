import actionNames from './actionNames';
import Api from '../helpers/Api';
import { handleError } from './Error/errorActions';
const api = Api.getInstance();

export const addDTD = (dtd) => {
	return {
		type: actionNames.ADD_DTD,
		payload: dtd
	}
}

export const getDTDByVersion = (version) => {
	return (dispatch) => {
		api.get('/api/v1/form/version/' + version )
			.then(res => {
				dispatch(addDTD(res.data));
			})
			.catch(err => {
				console.log(err);
				dispatch(handleError());
			});
	}
}