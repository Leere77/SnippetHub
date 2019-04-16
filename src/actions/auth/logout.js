import { LOGOUT_REQUEST } from "../../constants"

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isAuth: false,
        isFetching: false,
        user: undefined
    }
}

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};