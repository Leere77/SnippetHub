import React from "react" 
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUser } from "../../../actions"

import LoginForm from "./LoginForm"
import "./LoginForm.scss"

const Login = ({isAuth, isFetching, errMsg, dispatch}) => {
    let errCaption
    if(isAuth) 
        return <Redirect to="/" />
        console.log(errMsg)
    if(errMsg) 
        errCaption = <span>{errMsg}</span>

    return(
        <div className="l-center l-center--form">
            <h1 className="l-center__label">Sign in</h1>
            {errCaption}
            
            <div className="c-auth">
                <form className="c-auth__form form">
                    <LoginForm isFetching={isFetching} submit={vals => dispatch(loginUser(vals))} />
                </form>
                <div className="c-auth__services">
                    <p className="c-auth__service-caption">Sign in with</p>
                    <button className="c-auth__service c-auth__service--google"><i className="fab fa-google-plus-g"></i> Google</button>
                    <button className="c-auth__service c-auth__service--github"><i className="fab fa-github"></i> Github</button>
                    <button className="c-auth__service c-auth__service--fb"><i className="fab fa-facebook-f"></i> Facebook</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({auth}) => ({
    isFetching: auth.isFetching,
    isAuth: auth.isAuth,
    errMsg: auth.errMsg
})

export default connect(mapStateToProps)(Login)