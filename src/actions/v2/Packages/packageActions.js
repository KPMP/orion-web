import actionNames from '../../actionNames';
import Api from '../../../helpers/Api';
const api = Api.getInstance();

export const getPackages = () => {
	return (dispatch) => {
		api.get('/api/v1/packages')
			.then(res => {
				dispatch(setPackages(res.data));
			})
			.catch(err => {
                alert("Cannot connect to KPMP Data Lake File Repository");
                console.error(err);
            });
	};
};

export const setPackages = (packages) => {
	return {
		type: actionNames.SET_PACKAGES,
		payload: packages
	}
}

export const uploadPackage = (packageInfo) => {
	console.log(packageInfo);
	return (dispatch) => {
		api.post('/api/v1/packages', packageInfo)
		.then(res=> {
			console.log(res);
		})
		.catch(err => {
			alert("We were unable to upload your package to the KPMP Data Lake File Repository");
			console.log(err);
		});
	};
}
