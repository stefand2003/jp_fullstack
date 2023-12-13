import '../styles/form.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../../alert/alert';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';

export default function reset_password() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [alert, setAlert] = useState({});

  const { post } = useApi();

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const handleSuccess = () => {
    setPasswordConfirmation('');
    setPassword('');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await post('auth/reset-password', {
      data: code,
      password,
      passwordConfirmation,
      onSuccess: (res) => handleSuccess(res),
      onFailure: (err) => setAlert(err),
    });
  };

  return (
    <>
      <Alert data={alert} />
      <form className='form form--page' onSubmit={handleSubmit}>
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
          <label className='form__label'>Confirm New Password</label>
          <input
            className='form__field'
            type='password'
            placeholder='Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className='form__group form__group--page'>
          <input className='form__btn' type='submit' value='Reset_Password' />
        </div>

        <footer>
          RememberPassword? <Link to='/login'>Login</Link>
        </footer>
      </form>
    </>
  );
}
