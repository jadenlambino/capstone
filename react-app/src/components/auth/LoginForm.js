import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
// import {  useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { grabReviews } from '../../store/reviews';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({please, work}) => {
  // const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [open, setOpen] = useState(false)
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      work(false)
      await dispatch(grabReviews())
      // history.push('/listings')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to='/listings' />;
  // }

  const setDemo = async (e) => {
    e.preventDefault();
    // setOpen(false)
    work(false)
    await dispatch(login('demo@aa.io', 'password'))
    // history.push('/listings')
  }

  // const openModal = (e) => {
  //   e.preventDefault()
  //   setOpen(!open)
  // }

  return (
    <>
      <Popup modal className='auth-popup' open={please} onClose={() => work(false)}>
        <form onSubmit={onLogin} className='lf'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className='error'>{error}</div>
            ))}
          </div>
          <div className='lfe'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='lfe'>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit' className='lb'>Login</button>
          <button onClick={setDemo} className='sb'>Demo</button>
        </form>
      </Popup>
    </>
  );
};

export default LoginForm;
