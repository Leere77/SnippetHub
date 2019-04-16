import React, { useEffect, useRef, useState } from "react"
import {Link} from "react-router-dom"
import { connect } from 'react-redux';

import { getUserInfo } from "../../../actions"

import "./Header.scss"
import SearchInput from "../SearchInput/SearchInput";

const Header = ({isFetching, isAuth, user, errMsg, dispatch, match}) => {
  if(isAuth&&!user)
    if(!isFetching && !errMsg)
        dispatch(getUserInfo())
  
  const profileLink = user ? `/users/${user.userName}` : "/login"
  const profileLabel = user ? user.userName : "Sign in"
    
  const [navState, toggleNavState] = useState(false)
  const [clickedOutside] = useState(true);
  const mobileLinks = useRef()

  const navActiveStyle = (navState && clickedOutside) ? " header__mobile--active" : ""

  const handleClickOutside = e => {
      if (!mobileLinks.current.contains(e.target)) {
        toggleNavState(false)
      }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }); 

  return (
  <header className="header" ref={mobileLinks}>
    <div className="header__l-flex">
      <div className="header__section">
        <div className="header__logo">
          <Link to="/" onClick={() => toggleNavState(false)}><span className="fas fa-code"></span></Link>
          <Link to="/" className="header__name link" onClick={() => toggleNavState(false)}> Snippet hub</Link>
        </div>

        <div className="header__links header__links--hidden">
          <Link to="/search" className="header__link link">Search</Link>
          <Link to="/somePath" className="header__link link">Second</Link>
          <Link to="" className="header__link link">Third</Link>
        </div>
      </div>
        
      <div className="header__section header__section--right ">

        <SearchInput block="header" placeholder="Search"/>

        <Link to={profileLink} className="header__link link header__link--sign-in">{profileLabel}</Link>
        <span className="fas fa-ellipsis-h header__dots" onClick={() => toggleNavState(!navState)}></span>
      </div>
    </div>

    <div className={"header__mobile" + navActiveStyle} >
      <div className="header__links header__links--mobile">
          <a href="" className="header__link link" onClick={() => toggleNavState(false)} >First</a>
          <a href="" className="header__link link" onClick={() => toggleNavState(false)} >Second</a>
          <a href="" className="header__link link" onClick={() => toggleNavState(false)} >Third</a>
          <Link to={profileLink} className="header__link link" onClick={() => toggleNavState(false)}>{profileLabel}</Link>
      </div>
    </div>
  </header>
  )
}

const mapStateToProps = ({auth}) => ({
  user: auth.user,
  isAuth: auth.isAuth,
  isFetching: auth.isFetching,
  errMsg: auth.errMsg
})

export default connect(mapStateToProps)(Header)