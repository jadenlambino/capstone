
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
      <div>
        <NavLink to='/login' exact={true} activeClassName='active' className='nav-item'>
          Login
        </NavLink>
      </div>
      <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active' className='nav-item'>
          Sign Up
        </NavLink>
      </div>
    </>
  )

  let logout = (
    <Popup
      trigger={<div>Profile</div>}
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
      <div>
        <NavLink to='/listings' exact={true} activeClassName='active' className='nav-item'>
          Buy
        </NavLink>
      </div>
      {!user && logSign}
      <div>
        <NavLink to='/users' exact={true} activeClassName='active' className='nav-item'>
          Users
        </NavLink>
      </div>
      {user && logout}
    </nav>
  );
}

export default NavBar;
