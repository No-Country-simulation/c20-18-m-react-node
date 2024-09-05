import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';
import { LOGIN } from './../../providers/endpoints.js';
import { api, updateToken } from '../../providers/api.js';
import { setToken } from '../../helpers/auth.js';

function Login() {
  let navigate = useNavigate();
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);

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
          // TODO: incorporar lógica de cierre de sesión
          updateToken();

          if (res.data.role === 'Admin') {
            navigate('/usuarios');
          } else {
            navigate('/principal')
          }
        },
        (error) => {
          console.log('error: ', error);
        }
      )
      .finally(
        setLoading(false)
      );
  };

  return (
    <div className='login-container'>
      <div className='login-background'></div>
      <div className='login-form-container'>
        <div className='login-form'>
          <h2>Ingreso</h2>
          <label className='hintLogin'>
            Ingresa tu correo y contraseña para iniciar sesion
          </label>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                required
                type='email'
                name='email'
                placeholder='Correo'
                onChange={handleInput}
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
            <div className='form-group'>
              <input type='checkbox' name='remember' />
              <label>Recordarme</label>
            </div>
            <button type='submit' className='login-button' disabled={loading}>
              {!loading ? 'Iniciar sesión' : 'Cargando'}
            </button>
          </form>
          <Link to='/register'>
            <button type='button' className='signup-button'>
              ¿Aún no tienes una cuenta? Crear cuenta
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
