import Api from '../../helpers/Api';

const api = Api.getInstance();

export const handleError = (statusCode) => {
    return (dispatch) => {
    	if (statusCode === 404) {
    		window.location.href = "/notRegistered";
    	} else if (statusCode === 403) {
    		window.location.href = "/permissionDenied"
    	} else {
    		window.location.href = "/oops";
    	}
    }
};

export const sendMessageToBackend = (error) => {
	
	if (error.response && error.response.status && error.response.status >= 400) {
		return (dispatch) => {
			if (!window.location.href.includes("/oops")) {
				dispatch(handleError(error.response.status));
			}
		}
	} else {
		let errorMessage = { error: error.message , stackTrace: error.stack }
		return (dispatch) => {
			api.post('/api/v1/error', errorMessage)
			.then(res=> {
				dispatch(handleError(error.response.status));
			});
		};
	}
}
