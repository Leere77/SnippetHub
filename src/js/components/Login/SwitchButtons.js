import React from "react"

export const SwitchButtons = ({switchFunc, state}) => {
    function modifier(signInEl) {
        return (state&&signInEl || !state&&!signInEl)? "form__type--current":""
    }

    return (
        <div className="form__types">
            <span onClick={() => switchFunc(true)} className={"form__type link " + modifier(true)} >Sign in</span>
            <span onClick={() => switchFunc(false)} className={"form__type link " + modifier(false)}>Sign up</span>
        </div>
    )
}