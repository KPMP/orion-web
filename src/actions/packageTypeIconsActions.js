import Api from '../helpers/Api';
import actionNames from './actionNames';
import { sendMessageToBackend } from './Error/errorActions';

const api = Api.getInstance();

export const setPackageTypeIcons = (packageTypeIcons) => {
    return {
        type: actionNames.SET_PACKAGE_TYPE_ICONS,
        payload: packageTypeIcons
    }
}

export const getPackageTypeIcons = () => {
    return (dispatch) => {
        api.get('/api/v1/packageTypeIcons')
            .then(res => {
                dispatch(setPackageTypeIcons(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(sendMessageToBackend(err));
            });
    }
}

