export const handleError = (error, props) => {
    return (dispatch) => {
        window.location.href = "/oops";
        console.error(error);
    }
};
