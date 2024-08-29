import './assets/styles/login.css'
function Login() {
  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-form-container">
        <div className="login-form">
          <h2>Ingreso</h2>
          <label className='hintLogin'>Ingresa tu correo y contraseña para iniciar sesion</label>
          <form>
            <div className="form-group">
              <input type="email" name="email" required  placeholder='Correo'/>
            </div>
            <div className="form-group">
              
              <input type="password" name="password" required placeholder='Contraseña'/>
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember" />
              <label>Recordarme</label>
            </div>
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>
          <button className="signup-button">¿Aún no tienes una cuenta? Crear cuenta</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
