import React from "react" 
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserInfo } from "../../../actions"

import "./UserPage.scss"

const UserPage = ({isFetching, isAuth, user, errMsg, dispatch, match}) => {
    if(!isAuth || errMsg)
        return <Redirect to='/login'/>

    if(isAuth&&!user)
        if(!isFetching)
            dispatch(getUserInfo())
        else
            return <h1>Loading</h1>

    return (
        <h1>{user&&user.userName}</h1>
    )
}

const mapStateToProps = ({auth}) => ({
    isFetching: auth.isFetching,
    isAuth: auth.isAuth,
    user: auth.user,
    errMsg: auth.errMsg
})

export default connect(mapStateToProps)(UserPage)