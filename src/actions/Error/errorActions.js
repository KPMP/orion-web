export const handleError = (error, props) => {
    return (dispatch) => {
        props.history.push("/oops");
        console.error(error);
    }
};
