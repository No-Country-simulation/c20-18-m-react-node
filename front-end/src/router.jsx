import { createBrowserRouter } from 'react-router-dom';

//* VISTAS
import App from './App';
import Login from './view/login';
import Register from './view/register';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
]);
