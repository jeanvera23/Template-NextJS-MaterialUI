
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
        "email": email,
        "password": password
    };
    console.log(body);
    const url = `${config.connectionString}/api/auth`;
    console.log(url);
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
            userId: 1,
            firstName: "Jean",
            lastName: "Vera",
            token: "12345"
        }
    });
    /* try {
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
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    userId: res.userId,
                    firstName: res.firstName,
                    lastName: res.lastName,
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
    } */
};
const logout = () => async (dispatch) => {
    dispatch({
        type: 'LOGOUT'
    });
};


const getUsers = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(fetchStart());

    try {
        const response = await fetch(`${settings.connectionString}/api/users`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': state.userReducer.currentUser.token
            },
            method: 'GET'
        });
        const res = await response.json();
        dispatch({
            type: "GET_USERS",
            payload: res
        });

    } catch (error) {
        dispatch(fetchFailure(error));
        console.log(error);
    }
    
};


const userActions = {
    login,
    logout,
    getUsers,
}
export default userActions;