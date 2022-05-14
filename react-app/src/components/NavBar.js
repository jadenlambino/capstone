
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Popup from 'reactjs-popup'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>
      <div>
        <NavLink to='/' exact={true} activeClassName='active' className='nav-item'>
          Home
        </NavLink>
      </div>
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
      <div>
        <NavLink to='/users' exact={true} activeClassName='active' className='nav-item'>
          Users
        </NavLink>
      </div>
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
    </nav>
  );
}

export default NavBar;
