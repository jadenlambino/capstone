
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Popup from 'reactjs-popup'
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let logSign = (
    <>
      <div className='nd'>
        <NavLink to='/login' exact={true} activeClassName='active' className='nav-item'>
          LOGIN
        </NavLink>
      </div>
      <div className='nd'>
        <NavLink to='/sign-up' exact={true} activeClassName='active' className='nav-item'>
          SIGN UP
        </NavLink>
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
            <NavLink to='/login' exact={true} className='nav-item'>
              SELL
            </NavLink>
          </div>
        )}
        {!user && logSign}
        {user && logout}
      </div>
    </nav>
  );
}

export default NavBar;
