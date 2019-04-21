import React, { Component } from "react"
import {SwitchButtons} from './SwitchButtons'

function Inputs({inputsArray, warning}) {
    return inputsArray.map(input => {
        let className = input.className

        return (
            <>
                <div className="form__label-wrapper">
                    <label className="form__label" htmlFor={input.name} key={input.label}>{input.label}</label>
                    {warning && input.name in warning && <span className="form__label--error">{warning[input.name]}</span>}
                </div>
                <input 
                    type={input.type}
                    name={input.name}
                    className={className}
                    id={input.name}
                    onChange={e => input.onChange(e)}
                    placeholder={input.placeholder}
                    onBlur={input.onBlur}
                    key={input.name}
                />
            </>
        )
    })
}

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logIn: true,
            email: '',
            userName: '',
            userNameSignUp: '',
            passwordSignIn: '',
            password: '',
            passwordRepeat: '',
            warning: null
        }

        //this.auth = new authMethods()

        this.toggleType = this.toggleType.bind(this)
        this.handler = this.handler.bind(this)
        this.submit = this.submit.bind(this)

        this.signIninputs = [{
            type: 'text',
            name: 'userName',
            label: 'Username',
            className: 'form__input',
            placeholder: 'Your name',
            onChange: this.handler
        },
        {
            type: 'password',
            name: 'passwordSignIn',
            label: 'Password',
            className: 'form__input',
            placeholder: 'Password',
            onChange: this.handler
        }]

        this.signUpinputs = [{
            type: 'text',
            name: 'email',
            label: 'Email',
            className: 'form__input',
            placeholder: 'Your email',
            onChange: this.handler
        },
        {
            type: 'text',
            name: 'userNameSignUp',
            label: 'Username',
            className: 'form__input',
            placeholder: 'Your name',
            onChange: this.handler
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            className: 'form__input',
            placeholder: 'Password',
            onChange: this.handler
        },
        {
            type: 'password',
            name: 'passwordRepeat',
            label: 'Password',
            className: 'form__input',
            placeholder: 'Password again',
            onChange: this.handler
        }]
    }

    toggleType(logIn) {
        this.setState({logIn})
    }

    handler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault()
        let warning = {}
        if(!this.state.logIn) {
            if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(this.state.email)) warning.email = 'Wrong email'
            if(!this.state.password) warning.password = 'Field required'
            if(!this.state.passwordRepeat) warning.passwordRepeat = 'Field required'
            if(!this.state.userNameSignUp) warning.userNameSignUp = 'Field required'
            if(this.state.password != this.state.passwordRepeat) warning.passwordRepeat = 'Wrong password'
        } else {
            if(!this.state.userName) warning.userName = 'Field required'
            if(!this.state.passwordSignIn) warning.passwordSignIn = 'Field required'
        }

        if(Object.keys(warning).length > 0) {
            this.setState({warning})
            return
        }
        console.log(this.state)
        //this.auth.login(this.state.email, this.state.pass)
        //this.props.submit({userName: this.state.email, password: this.state.pass})
        if(this.state.logIn)
            this.props.loginUser({userName: this.state.userName, password: this.state.passwordSignIn})
        else
            this.props.signupUser({email: this.state.email, userName: this.state.userNameSignUp, password: this.state.password})
    }

    render() {
        return (
            <>
                <SwitchButtons 
                    switchFunc={this.toggleType} 
                    state={this.state.logIn}
                />
                <Inputs 
                    inputsArray={this.state.logIn ? this.signIninputs : this.signUpinputs} 
                    warning={this.state.warning}
                />
                
                <input 
                    type="submit" 
                    className="form__submit"
                    onClick={this.submit}
                    value={this.state.logIn ? 'Sign in' : 'Sign up'}
                />
            </>
        )
    }
}

export default LoginForm