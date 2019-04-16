import axios from "axios" 
import decode from 'jwt-decode'

import { TOKEN_REFRESH_REQUEST, TOKEN_REFRESH_SUCCESS, TOKEN_REFRESH_FAILURE } from "../constants"
import store from "../store"

const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const req = error.config
       if(error.code == 'ECONNABORTED') return Promise.reject(error)

        if(error.response.data.custom_error_description == "Bad credentials")
            return Promise.reject(error.response.data)

        if(error.response.status == 401) {
            const refresh_token = localStorage.getItem('refresh_token')

            try {
                const decoded = decode(refresh_token)

                if (decoded.exp < Date.now() / 1000) {
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                    store.dispatch({
                        type: TOKEN_REFRESH_FAILURE,
                        isFetching: false,
                        isAuth: false,
                        access_token: undefined,
                        refresh_token: undefined,
                        errMsg: "Refresh token is not valid"
                    })
                    console.log('invalid ref tok -> /login')
                    return Promise.reject(error.response.data.error)
                }
            } catch(e) {
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('access_token')
                store.dispatch({
                    type: TOKEN_REFRESH_FAILURE,
                    isFetching: false,
                    isAuth: false,
                    access_token: undefined,
                    refresh_token: undefined,
                    errMsg: "Refresh token is not valid"
                })
                return Promise.reject(error.response.data.error)
            }

            store.dispatch({
                type: TOKEN_REFRESH_REQUEST,
                isFetching: true
            })

            const body = `refresh_token=${refresh_token}&grant_type=refresh_token`

            const conf = {
                headers: {
                    contentType: "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa("client-id:secret")
                }
            }
            console.log('recieved error 401 response (dispatch true):')
            return axiosInstance.post('/oauth/token', body, conf)
                .then(({data}) => {
                    console.log('send and get ref request (dispatch true):')
                    store.dispatch({
                        type: TOKEN_REFRESH_SUCCESS,
                        isFetching: true,
                        isAuth: true,
                        access_token: data.access_token
                    })

                    localStorage.setItem('access_token', data.access_token)

                    axiosInstance.defaults.headers["Authorization"] = `Bearer ${data.access_token}`
                    req.headers["Authorization"] =`Bearer ${data.access_token}`

                    return axios(req)
                })
                .catch(errMsg => {
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('access_token')
                    store.dispatch({
                        type: TOKEN_REFRESH_FAILURE,
                        isFetching: false,
                        isAuth: false,
                        access_token: undefined,
                        refresh_token: undefined,
                        errMsg
                    })
                })
        }

        return Promise.reject(error)
    }
)

export default axiosInstance