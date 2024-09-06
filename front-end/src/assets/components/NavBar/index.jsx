import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../router';
import './styles.css';

/**
 * Muestra el listado de destinos posibles para un determinado usuario.
 * 
 * TODO: implementar lógica de destinos posibles para cada tipo de ususario.
 */
function NavBar() {
  return (
    <nav className='nav-bar-container'>
      <NavLink className='nav-link' to={routes.historialAcademico}>
        Historial Académico
      </NavLink>
      <NavLink className='nav-link' to={routes.informes}>
        Informes
      </NavLink>
      <NavLink className='nav-link' to={routes.eventos}>
        Eventos
      </NavLink>
      <NavLink className='nav-link' to={routes.usuarios}>
        Usuarios
      </NavLink>
    </nav>
  );
}

export default NavBar;
