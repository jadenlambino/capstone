import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';
import './LogoutButton.css'

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    history.push('/')
    await dispatch(logout());
  };

  return <button onClick={onLogout} className='logout-button'>Logout</button>;
};

export default LogoutButton;
