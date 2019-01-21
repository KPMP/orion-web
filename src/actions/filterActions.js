import Api from '../helpers/Api';
import actionNames from './actionNames';

const api = Api.getInstance();

export const addFilter = (type, value) => {
	return {
		type: actionNames.ADD_FILTER,
		payload: { filterType: type, value: value }
	}
}