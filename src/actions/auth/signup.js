import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "../../constants"
import { auth } from "../../js/authMethods"

function requestSignup() {
    return {
        type: SIGNUP_REQUEST,
        isFetching: true
    }
}

function signupSuccess() {
    return {
        type: SIGNUP_SUCCESS,
        isFetching: false
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

export const signupUser = (vals) => dispatch => {
    dispatch(requestSignup());
  
    auth.signUp(vals)
        .then(({ data }) => {
            if (data.error) throw new Error(data.message);

            dispatch(signupSuccess());
        })
        .catch(err => dispatch(signupFailture(err.data.message.charAt(0).toUpperCase() + err.data.message.slice(1))));
  };