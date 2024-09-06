import axios from 'axios';
import { getToken } from '../helpers/auth';

// const BASE_URL = 'https://seguimiento-escolar-api.onrender.com/api/v1/';
const BASE_URL = 'https://c20-18-m-react-node.onrender.com/api/v1/';
// const BASE_URL = 'https://c20-18-m-react-node-production.up.railway.app/api/v1/';

//* Interceptor de respuesta, chequea que la respuesta no tenga error 401 o 403
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      const token = localStorage.getItem('TOKEN');
      if (token) {
        console.log(`error ${error.response.status}: token vencido.`);
        cleanSession();
        window.location = '/';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Crea una instancia de axios para uso sin token.
 */
export const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * Crea una instancia de axios para uso con token.
 */
export var auth_api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
  responseType: 'json',
});

/**
 * Actualiza el token en el header de la instancia de [auth_api].
 */
export const updateToken = () => {
  auth_api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    responseType: 'json',
  });
};
