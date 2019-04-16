import React, { Component } from "react"
import {SwitchButtons} from './SwitchButtons'

const SignInInputs = ({handler, submit}) => {
    return (
        <>
            <label htmlFor="email">E-mail</label><br/>
            <input type="text" name="email" className="form__input" id="email" onChange={handler} placeholder="Your e-mail"/><br/>

            <label htmlFor="pass">Password</label><br/>
            <input type="password" name="pass" className="form__input" id="pass" onChange={handler} placeholder="Your password"/><br/>

            <input type="submit" className="form__submit" onClick={submit} value="Sign in" />
        </>
    )
}

const SignUpInputs = ({handler, submit}) => {
    return (
        <>
            <label htmlFor="email">E-mail</label><br/>
            <input type="text" name="email" className="form__input" id="email" onChange={handler} placeholder="Your e-mail"/><br/>

            <label htmlFor="username">Username</label><br/>
            <input type="text" name="username" className="form__input" id="username" onChange={handler} placeholder="Your password"/><br/>

            <label htmlFor="pass">Password</label><br/>
            <input type="password" name="pass" className="form__input" id="pass" onChange={handler} placeholder="Your password"/><br/>

            <input type="submit" className="form__submit" onClick={submit} value="Sign up" />
        </>
    )
}

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logIn: true,
            email: 'admin',
            username: null,
            pass: 'admin'
        }

        //this.auth = new authMethods()

        this.toggleType = this.toggleType.bind(this)
        this.handler = this.handler.bind(this)
        this.submit = this.submit.bind(this)
    }

    toggleType(curr) {
        this.setState({logIn: curr})
    }

    handler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault()
        //this.auth.login(this.state.email, this.state.pass)
        this.props.submit({username: this.state.email, password: this.state.pass})
        if(this.state.logIn)
            console.log({email: this.state.email, password: this.state.pass})
        else
            console.log({email: this.state.email, username: this.state.username, password: this.state.pass})
    }

    render() {
        return (
            <>
                <SwitchButtons switchFunc={this.toggleType} state={this.state.logIn}/>

                {this.state.logIn && <SignInInputs handler={this.handler} submit={this.submit}/>}
                {!this.state.logIn && <SignUpInputs  handler={this.handler} submit={this.submit}/>}
            </>
        )
    }
}

export default LoginForm