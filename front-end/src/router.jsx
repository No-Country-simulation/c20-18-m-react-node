import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './pages/Login';
import HistorialAcademicoView from './pages/historialAcademico';
import InformesView from './pages/informes';
import EventosView from './pages/eventos';
import UsuariosView from './pages/Usuarios';

/**
 * Objeto con las rutas posibles.
 */ 
export const routes = {
  login: '/login',
  historialAcademico: '/historial-academico',
  informes: '/informes',
  eventos: '/eventos',
  usuarios: '/usuarios',
};

/**
 * Enrutador que será usado por [RouterProvider] en ./main.jsx
 */
export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: routes.login, element: <Login /> },
  { path: routes.historialAcademico, element: <HistorialAcademicoView /> },
  { path: routes.informes, element: <InformesView /> },
  { path: routes.eventos, element: <EventosView /> },
  { path: routes.usuarios, element: <UsuariosView /> },
]);
