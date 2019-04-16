import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../../constants"
import { auth } from "../../js/auth"

function requestSignup() {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true
    }
}

function signupSuccess(tokens) {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false,
        isAuth: true,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token
    }
}

function signupFailture(errMsg) {
    return {
        type: SIGNUP_FAILURE,
        isFetching: false,
        isAuth: false,
        errMsg
    }
}

export const signupUser = ({ name, email, password }) => dispatch => {
    dispatch(requestSignup());
  
    Auth.signup(name, email, password)
      .then(({ err, access_token, refresh_token }) => {
        if (err) throw new Error(err);

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        dispatch(signupSuccess({ access_token, refresh_token }));
      })
      .catch(err => dispatch(signupFailture(err)));
  };