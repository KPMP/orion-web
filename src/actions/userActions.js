import Api from '../helpers/Api';	
import actionNames from './actionNames';	
import { sendMessageToBackend } from './Error/errorActions';	

 const api = Api.getInstance();	

 export const getUserInformation = () => {	
	return (dispatch) => {
		const userInfoURL = '/api/v1/userInformation';
		api.get(userInfoURL)
			.then(res => {
				console.log(res.request.responseURL + " " + userInfoURL)
				if (res.request.responseURL != userInfoURL) {
					console.log("blah")
				}
				dispatch(setUserInformation(res.data));	
			})	
			.catch(err => {
				dispatch(sendMessageToBackend(err));
	        });
	};	
} 	

 export const setUserInformation = (userInfo) => {	
	return {	
		type: actionNames.SET_USER_INFORMATION,	
		payload: userInfo	
	}	
} 