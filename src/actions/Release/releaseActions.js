import Api from "../../helpers/Api";
import {handleError} from "../Error/errorActions";
import actionNames from "../actionNames";

const api = Api.getInstance();

export const getReleases = () => {
    return (dispatch) => {
        api.get('/api/v1/releases')
            .then(res => {
                dispatch(setReleases(res.data));
            })
            .catch(err => {
                dispatch(handleError("Unable to connect to the Data Lake: " + err));
            });
    };
};

export const setReleases = (releases) => {
    return {
        type: actionNames.SET_RELEASES,
        payload: releases
    }
}