import Api from '../helpers/Api';
import actionNames from './actionNames';
import { handleError } from './Error/errorActions';

const api = Api.getInstance();

export const getPackageTypeIcons = () => {
    return (dispatch) => {
        api.get('/api/v1/packageTypeIcons')
            .then(res => {
                dispatch(setPackageTypeIcons(res.data));
            })
            .catch(err => {
                console.log(err);
                handleError();
            });
    }
}

export const setPackageTypeIcons = (packageTypeIcons) => {
    return {
        type: actionNames.SET_PACKAGE_TYPE_ICONS,
        payload: packageTypeIcons
    }
}
