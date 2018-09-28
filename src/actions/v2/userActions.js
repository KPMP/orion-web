import Api from '../../helpers/Api';
const api = Api.getInstance();

export const getUserInformation = () => {
	console.log("outside return in getUserInformation");
	return (dispatch) => {
		console.log("in get user information ");
		api.get('/api/v1/attributes')
			.then(res => {
				console.log(res)
			})
			.catch(err => {
	            alert("Unable to retrieve user information");
	            console.error(err);
	        });
	};
} 