import Api from '../helpers/Api';	
import actionNames from './actionNames';	
import { handleError } from './Error/errorActions';	

 const api = Api.getInstance();	

 export const getUserInformation = () => {	
	return (dispatch) => {	
		api.get('/api/v1/userInformation')	
			.then(res => {	
				dispatch(setUserInformation(res.data));	
			})	
			.catch(err => {	
				dispatch(handleError("Unable to retrieve user information: " + err));	
	        });	
	};	
} 	

 export const setUserInformation = (userInfo) => {	
	return {	
		type: actionNames.SET_USER_INFORMATION,	
		payload: userInfo	
	}	
} 