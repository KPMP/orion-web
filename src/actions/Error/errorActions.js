export const handleError = (error) => {
    return (dispatch) => {
        window.location.href = "/#/oops";
        console.error(error);
    }
};
