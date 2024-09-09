import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { LOGIN } from '../../providers/endpoints.js';
import { api, updateToken } from '../../providers/api.js';
import {
  cleanSession,
  deleteRememberMe,
  getRememberMe,
  setRememberMe,
  setRole,
  setToken,
} from '../../helpers/auth.js';

function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [rememberMeBool, setRememberMeBool] = useState(false);

  useEffect(() => {
    cleanSession();
    const rememberEmail = getRememberMe();
    if (rememberEmail) {
      setRememberMeBool(true);
      setInput({
        ...input,
        email: rememberEmail,
      });
    }
  }, []);

  const handleRememberMe = (e) => {
    setRememberMeBool(e.target.checked);
  };

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    api
      .post(LOGIN, input)
      .then(
        (res) => {
          setToken(res.data.token);

          const role = res.data.role;
          setRole(role);
          updateToken();

          rememberMeBool ? setRememberMe(input.email) : deleteRememberMe();

          if (role === 'Admin') {
            navigate('/usuarios');
          } else {
            navigate('/principal');
          }
        },
        (error) => {
          console.log('error: ', error);
        }
      )
      .finally(setLoading(false));
  };

  return (
    <div className='login-container'>
      <div className='login-background'></div>
      <div className='login-form-container'>
        <div className='login-form'>
          <h2>Ingreso</h2>
          <label className='hint-login'>
            Ingresa tu correo y contraseña para iniciar sesión
          </label>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                required
                type='email'
                name='email'
                placeholder='Correo'
                onChange={handleInput}
                value={input.email}
              />
            </div>
            <div className='form-group'>
              <input
                required
                type='password'
                name='password'
                placeholder='Contraseña'
                onChange={handleInput}
              />
            </div>
            <div className='remember-me'>
              <input
                id='remember-me'
                type='checkbox'
                name='remember'
                onChange={handleRememberMe}
                checked={rememberMeBool}
              />
              <label htmlFor='remember-me'>Recordarme</label>
            </div>
            <button type='submit' className='login-button' disabled={loading}>
              {!loading ? 'Iniciar sesión' : 'Cargando'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
