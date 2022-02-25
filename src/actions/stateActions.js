import Api from '../helpers/Api';
import { sendMessageToBackend } from './Error/errorActions';
import { setRefresh } from "./Packages/packageActions";
import actionNames from './actionNames';	

const api = Api.getInstance();

export const getStateEvents = (callback) => {
	return (dispatch) => {
		api.get('/api/v1/state/events/' + new Date().getTime())
			.then((data) => {
				// timeout: true will be sent by server if the server times out before the client
				if(!data.data.hasOwnProperty('timeout')) {
                    dispatch(setRefresh(true));
                }
				callback.networkRetries = 0;
				callback();
			})
			.catch((err) => {
				if(err.code === 502 ||
					err.message.match(RegExp('502')) ||
					err.message.match(RegExp('timeout', 'gi'))) {
					// Timeouts are typical and not limited
					callback();
				}

				else if(err.message.match(RegExp('Network Error', 'gi')) &&
					(callback.networkRetries === undefined || callback.networkRetries < 3)) {
					// Network retries are limited
					callback.networkRetries = callback.networkRetries || 0;
                    callback.networkRetries++;
					callback();
				}

				else if(err.message.match(RegExp('aborted', 'gi'))) {
					// Client terminated polling; do nothing
				}

				else {
					dispatch(sendMessageToBackend(err));
				}
			});
	};
};

export const setStateDisplayMap = (stateDisplaymap) => {	
	return {	
		type: actionNames.SET_STATE_DISPLAY_MAP,	
		payload: stateDisplaymap	
	}	
};

export const getStateDisplayMap = () => {
	return (dispatch) => {	
		api.get('/api/v1/state/stateDisplayMap')	
			.then((res) => {	
				dispatch(setStateDisplayMap(res.data));	
			})	
			.catch((err) => {
				dispatch(sendMessageToBackend(err));	
	        });	
	};	
};