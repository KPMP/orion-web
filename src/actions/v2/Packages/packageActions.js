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

export const uploadPackage = (uploader, packageInfo) => {
	console.log(packageInfo);
}
