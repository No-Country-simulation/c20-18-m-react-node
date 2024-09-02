import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './view/login';
import Register from './view/register';
import Student from './view/student';
import Teacher from './view/teacher';
import Father from './view/father';
import HistorialAcademicoView from './view/HistorialAcademicoView';
import EvaluacionesView from './view/EvaluacionesView';
import InformesView from './view/InformesView';
import EventosView from './view/EventosView';
import MensajesView from './view/MensajesView';

/**
 * Objeto con las rutas posibles.
 */ 
export const routes = {
  login: '/login',
  historialAcademico: '/historial-academico',
  evaluaciones: '/evaluaciones',
  informes: '/informes',
  eventos: '/eventos',
  mensajes: '/mensajes',
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
  { path: routes.evaluaciones, element: <EvaluacionesView /> },
  { path: routes.informes, element: <InformesView /> },
  { path: routes.eventos, element: <EventosView /> },
  { path: routes.mensajes, element: <MensajesView /> },
]);
