import actionNames from '../actionNames';
import { viewUploadedFiles } from './uploadTabActions';

export const updateUploadResponse = (response) => {
    return {
        type: actionNames.UPDATE_UPLOAD_RESPONSE,
        payload: response
    }
}

export const doUpdate = (response) => {
	updateUploadResponse(response);
}

export const uploadFile = (data) => {
    const url = "http://localhost:3030/upload";
    const body = new FormData();

    Object.keys(data).forEach(( key ) => {
        if (key === "files") {
            data[ key ].forEach((file) => body.append("files", file))
        } else {
            body.append(key, data[ key ]);
        }
    });

    return (dispatch) => {
        fetch(url, {
            method: "POST",
            mode: "cors",
            body: body,
            enctype: "multipart/form-data"
            })
        .then(res => res.json())
        .then(res => {
                console.log(res);
                dispatch(doUpdate(res));
            }
        )
        .catch(err => console.error(err));
    };

};