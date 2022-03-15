export const INITIAL_STATE = {
    msg: "",
    type: "normal",
    open: false
}

const alertReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'OPEN_ALERT':
            return {
                ...state,
                msg: action.payload.msg,
                type: action.payload.type,
                open: true,
            };
        case 'CLOSE_ALERT':
            return {
                ...state,
                open: false,
            }
        default:
            return state;
    }
}
export default alertReducer;