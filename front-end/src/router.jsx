import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './view/login';
import Register from './view/register';
import Student from './view/student';
import Teacher from './view/teacher';
import Father from './view/father';
import HistorialAcademicoView from './view/HistorialAcademicoView';
import InformesView from './view/InformesView';
import EventosView from './view/EventosView';

/**
 * Objeto con las rutas posibles.
 */ 
export const routes = {
  login: '/login',
  historialAcademico: '/historial-academico',
  informes: '/informes',
  eventos: '/eventos',
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
]);
