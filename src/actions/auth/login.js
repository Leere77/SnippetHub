import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../../constants"
import { auth } from "../../js/auth"

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isFetching: true
    }
}

function loginSuccess(tokens) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuth: true,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

function loginFailture(errMsg) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuth: false,
        errMsg: errMsg.custom_error_description
    }
}

export const loginUser = ({username, password}) => dispatch => {
    dispatch(requestLogin())

    auth.login(username, password)
        .then(({error, access_token, refresh_token }) => {
            if(error) throw new Error(error)

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            dispatch(loginSuccess({ access_token, refresh_token }));
        })
        .catch(err => dispatch(loginFailture(err)))
}