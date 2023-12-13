import '../styles/form.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../alert/alert';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';
import { useCookie } from '../../hooks/useCookie';

export default function login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setIsAuthenticated } = useAuth();
  const { savedAuthCookie } = useCookie();

  const navigate = useNavigate();
  const { post } = useApi();

  const handleSuccess = (res) => {
    savedAuthCookie(res.data.jwt);

    setIdentifier('');
    setPassword('');

    setIsAuthenticated(true);

    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await post('auth/local', {
      data: { identifier, password },
      onSuccess: (res) => handleSuccess(res),
      onFailure: (err) => setAlert(err),
    });
  };

  return (
    <>
      <Alert data={alert} />
      <form className='form form--page' onSubmit={handleSubmit}>
        <div className='form__group form__group--page'>
          <label className='form__label'>Email</label>
          <input
            className='form__field'
            type='text'
            placeholder='Email'
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <label className='form__label'>Password</label>
          <input
            className='form__field'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <input className='form__btn' type='submit' value='Login' />
        </div>

        <footer>
          Dont have an account? <Link to='/register'>Register</Link> or Forgot
          Password?<Link to='/forgot-password'> Reset here</Link>
        </footer>
      </form>
    </>
  );
}
