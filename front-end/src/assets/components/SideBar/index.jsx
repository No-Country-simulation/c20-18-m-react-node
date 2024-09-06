import { useNavigate } from 'react-router-dom';
import './styles.css';
import NavBar from '../NavBar';
import { cleanSession } from '../../../helpers/auth';

function SideBar() {
  let navigate = useNavigate();

  // Manejo del cierre de sesión (click al botón "Cerrar sesión")
  function handleLogout() {
    // TODO: complementar con cierre de sesión en back?
    cleanSession();
    navigate('/');
  }

  return (
    <aside className='main-sidebar-container'>
      <h2>NoCountry</h2>
      <section className='sidebar-buttons-container'>
        {/* Botones de navegación */}
        <NavBar />

        {/* Botón de cierre de sesión */}
        <button type='button' className='logout-button' onClick={handleLogout}>
          Cerrar Sesion
        </button>
      </section>
    </aside>
  );
}

export default SideBar;
