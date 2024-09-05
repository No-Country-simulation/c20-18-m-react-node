import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './pages/Login';
import Register from './pages/register';
import Student from './pages/student';
import Teacher from './pages/teacher';
import Father from './pages/father';
import HistorialAcademicoView from './pages/HistorialAcademicoView';
import InformesView from './pages/InformesView';
import EventosView from './pages/EventosView';
import PrincipalView from './pages/Principal';
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
  principal: '/principal',
};

/**
 * Enrutador que será usado por [RouterProvider] en ./main.jsx
 */
export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: routes.login, element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/student', element: <Student /> },
  { path: '/teacher', element: <Teacher /> },
  { path: '/father', element: <Father /> },
  { path: routes.historialAcademico, element: <HistorialAcademicoView /> },
  { path: routes.informes, element: <InformesView /> },
  { path: routes.eventos, element: <EventosView /> },
  { path: routes.usuarios, element: <UsuariosView /> },
  { path: routes.principal, element: <PrincipalView /> },
]);
