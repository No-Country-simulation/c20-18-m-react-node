import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './view/login';
import Register from './view/register';
import Student from './view/student';
import Teacher from './view/teacher';
import Father from './view/father'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/student', element: <Student /> },
  { path: '/teacher', element: <Teacher /> },
  { path: '/father', element: <Father /> },
]);
