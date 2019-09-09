import Api from "../../helpers/Api";
import { sendMessageToBackend } from "../Error/errorActions";
import actionNames from "../actionNames";

const api = Api.getInstance();

export const getReleases = () => {
    return (dispatch) => {
        api.get('/api/v1/releases')
            .then(res => {
                dispatch(setReleases(res.data));
            })
            .catch(err => {
                dispatch(sendMessageToBackend(err));
            });
    };
};

export const setReleases = (releases) => {
    return {
        type: actionNames.SET_RELEASES,
        payload: releases
    }
}