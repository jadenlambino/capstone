
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Popup from 'reactjs-popup'
import './NavBar.css'
import { useSelector } from 'react-redux';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignUpForm';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

  const showLogin = (e) => {
    e.preventDefault();
    setLogin(!login)
  }

  const showSignup = (e) => {
    e.preventDefault();
    setSignup(!signup)
  }

  let logSign = (
    <>
      <div className='nd'>
        <button className='nb' onClick={showLogin}>LOGIN</button>
        <Popup open={login} onClose={showLogin}>
          <LoginForm />
        </Popup>
      </div>
      <div className='nd'>
        <button className='sb' onClick={showSignup}>SIGN UP</button>
        <Popup open={signup} onClose={showSignup}>
            <SignupForm />
        </Popup>
      </div>
    </>
  )

  let logout = (
    <Popup
      trigger={<div>PROFILE</div>}
      position='bottom center'
      on='hover'
      closeOnDocumentClick
      mouseLeaveDelay={100}
      mouseEnterDelay={0}
      arrow={false}
    >
      <LogoutButton />
    </Popup>
  )

  return (
    <nav>
      <h1 className="title">J A I L E D</h1>
      <div className='nc'>
        <div className='nd'>
          <NavLink to='/listings' exact={true} activeClassName='active' className='nav-item'>
            BUY
          </NavLink>
        </div>
        <div className='nd'>
          <NavLink to='/users' exact={true} activeClassName='active' className='nav-item'>
            USERS
          </NavLink>
        </div>
        {user ? (
          <div className='nd'>
            <NavLink to='/sell' exact={true} className='nav-item'>
              SELL
            </NavLink>
          </div>
        ) : (
          <div className='nd'>
            <h4 onClick={showLogin}>
              SELL
            </h4>
          </div>
        )}
        {!user && logSign}
        {user && logout}
      </div>
    </nav>
  );
}

export default NavBar;
