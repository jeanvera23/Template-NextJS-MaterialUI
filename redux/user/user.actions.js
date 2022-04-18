import jwt_decode from "jwt-decode";

import { config } from '../../settings';
import { setAlert } from '../alert/alert.actions'

export const fetchStart = () => ({
    type: "FETCH_START_USER"
});

export const fetchFailure = (errorMessage) => ({
    type: "FETCH_FAILURE_USER",
    payload: errorMessage
});

export const fetchSuccess = () => ({
    type: "FETCH_SUCCESS_USER"
});

export const setCurrentUser = (errorMessage) => ({
    type: "SET_CURRENT_USER",
    payload: errorMessage
});

const login = (credentials) => async (dispatch) => {
    const { email, password } = credentials;
    dispatch(fetchStart());

    const body = {
        "username": email,
        "password": password
    };
    console.log(body);
    const url = `${config.connectionString}/api/auth`;
    console.log(url);
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        });
        const res = await response.json();
        console.log(res);
        dispatch(fetchSuccess());
        if (res.token) {

            let decodedToken = jwt_decode(res.token);

            console.log(decodedToken);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    ...decodedToken,
                    token: res.token
                }
            });
        } else {
            throw { message: "Access denied" };
        }
        return res;
    } catch (error) {
        console.log(error.message);
        dispatch(fetchFailure(error.message));
        dispatch(setAlert({ msg: "Access denied" }));
    }
};
const logout = () => async (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    });
};


const getUsers = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(fetchStart());
    console.log(state.userReducer.currentUser.token)
    try {
        const response = await fetch(`${config.connectionString}/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.userReducer.currentUser.token
            },
            method: 'GET'
        });
        console.log(response);
        if (response.status == 200) {
            const res = await response.json();

            dispatch({
                type: "GET_USERS",
                payload: res
            });
        }


    } catch (error) {
        dispatch(fetchFailure(error));
        console.log(error);
    }

};


const insetParticipant = (body) => async (dispatch, getState) => {
    const state = getState();
    dispatch(fetchStart());
    console.log(state.userReducer.currentUser.token)

    try {
        const response = await fetch(`${config.connectionString}/api/participants`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.userReducer.currentUser.token
            },
            method: 'POST',
            body: JSON.stringify(body)
        });
        const res = await response.json();
        console.log("res");
        console.log(res);
        if (response.status == 200) {
            const res = await response.json();

        }


    } catch (error) {
        dispatch(fetchFailure(error));
        console.log(error);
    }

};

const userActions = {
    login,
    logout,
    getUsers,
    insetParticipant
}
export default userActions;