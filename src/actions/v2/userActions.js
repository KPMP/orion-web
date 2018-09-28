const api = Api.getInstance();

const getUserInformation = () => {
	return (dispatch) => {
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