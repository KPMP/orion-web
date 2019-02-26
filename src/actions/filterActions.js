import Api from '../helpers/Api';
import actionNames from './actionNames';
import { handleError } from './Error/errorActions';

const api = Api.getInstance();

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

export const getUsers = () => {
	return (dispatch) => {
		api.get('/api/v1/users')
			.then(res => {
				dispatch(setUsers(res.data));
			})
			.catch(err => {
				console.log(err);
				handleError();
			});
	}
}

export const setUsers = (userList) => {
	return {
		type: actionNames.SET_USERS,
		payload: userList
	}
}