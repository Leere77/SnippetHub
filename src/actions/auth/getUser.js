import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from '../../constants';
import { auth } from "../../js/authMethods"

function requestUserInfo() {
    return {
        type: GET_USER_REQUEST,
        isFetching: true
    };
}

function userInfoSuccess(user) {
    return {
        type: GET_USER_SUCCESS,
        isFetching: false,
        user
    };
}

function userInfoError(errMsg) {
    return {
        type: GET_USER_FAILURE,
        isFetching: false,
        errMsg: errMsg
    };
}

export const getUserInfo = () => (dispatch, getState) => {
    dispatch(requestUserInfo());

    auth.getUserInfo(getState().auth.access_token)
        .then(res => {
            if (res.reason) throw new Error(res.reason);
            dispatch(userInfoSuccess(res));
        })
        .catch(err => dispatch(userInfoError(err)));
};