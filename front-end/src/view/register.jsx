import './App.css';
import './assets/login.css'
function register() {
  return (
    <div className="register-container">
      <div className="register-background"></div>
      <div className="register-form-container">
        <div className="register-form">
          <h2>Ingreso</h2>
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
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default register;
