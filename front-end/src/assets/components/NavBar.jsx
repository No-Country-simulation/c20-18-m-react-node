import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../router';
import '../styles/NavBar.css';

/**
 * Muestra el listado de destinos posibles para un determinado usuario.
 * 
 * TODO: implementar lógica de destinos posibles para cada tipo de ususario.
 * ej:
 * `{user.isAdmin && <NavLink to='/admin'>Admin</NavLink>}`
 */
function NavBar() {
  return (
    <nav className='nav-bar-container'>
      <NavLink className='nav-link' to={routes.historialAcademico}>
        Historial Académico
      </NavLink>
      <NavLink className='nav-link' to={routes.evaluaciones}>
        Evaluaciones
      </NavLink>
      <NavLink className='nav-link' to={routes.informes}>
        Informes
      </NavLink>
      <NavLink className='nav-link' to={routes.eventos}>
        Eventos
      </NavLink>
      <NavLink className='nav-link' to={routes.mensajes}>
        Mensajes
      </NavLink>
    </nav>
  );
}

export default NavBar;
