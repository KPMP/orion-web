import Api from '../../helpers/Api';

const api = Api.getInstance();

export const handleError = () => {
    return (dispatch) => {
        window.location.href = "/oops";
    }
};

export const sendMessageToBackend = (error) => {
	if (error.response && error.response.status && error.response.status >= 400) {
		return (dispatch) => {
			console.log("handling bad response");
			dispatch(handleError());
		}
	} else {
		let errorMessage = { error: error.message , stackTrace: error.stack }
		return (dispatch) => {
			api.post('/api/v1/error', errorMessage)
			.then(res=> {
				console.log("after sent message to service")
				dispatch(handleError());
			});
		};
	}
}
