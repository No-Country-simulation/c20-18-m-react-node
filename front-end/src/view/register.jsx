import { Link } from 'react-router-dom';
import './../assets/styles/register.css'

function Register() {
  return (
    <div className="register-container">
      <div className="register-background"></div>
      <div className="register-form-container">
        <div className="register-form">
          <h2>Registro</h2>
          <label className='hintregister'>Ingresa tus datos para crear una cuenta nueva</label>
          <form>
            <div className="form-group">
              <input type="email" name="email" required  placeholder='Correo'/>
            </div>
            <div className="form-group">
              
              <input type="password" name="password" required placeholder='Contraseña'/>
            </div>
            <div className="form-group">
              
              <input type="password" name="re-password" required placeholder='Repetir contraseña'/>
            </div>
            
            <button type="submit" className="register-button">Crear cuenta</button>
            <Link to='/login'>
              <button type='button' className="signup-button">¿Ya tienes una cuenta? Iniciar sesión</button>
            </Link>
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Register;
