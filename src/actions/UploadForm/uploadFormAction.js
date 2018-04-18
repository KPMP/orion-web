import actionNames from '../actionNames'

export const updateUploadResponse = (response) => {
    return {
        type: actionNames.UPDATE_UPLOAD_RESPONSE,
        payload: response
    }
}

export const uploadFile = (data) => {
    let url = "http://localhost:3030/upload";
    let body = new FormData();
    console.log(data);
    Object.keys(data).forEach(( key ) => {
        body.append(key, data[ key ]);
    });
    console.log('POST', body, data);
    return (dispatch) => {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: body,
            enctype: 'multipart/form-data'
            })
        .then(res => res.json())
        .then(res => {
                console.log(res);
                dispatch(updateUploadResponse(res));
            }
        )
        .catch(err => console.error(err));
    };

};