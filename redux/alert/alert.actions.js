
export const setAlert = ({ msg, type = "normal" }) => (dispatch) => {
    console.log("open alert");
    dispatch({
        type: "OPEN_ALERT",
        payload: { msg, type }
    })
};

export const closeAlert = () => (dispatch) => {
    dispatch({
        type: "CLOSE_ALERT",
    })
};
