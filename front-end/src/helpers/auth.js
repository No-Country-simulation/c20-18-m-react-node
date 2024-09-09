const TOKEN_KEY = 'TOKEN';
const ROLE_KEY = 'ROLE';
const REMEMBER_ME_KEY = 'REMEMBER_ME_KEY';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setRememberMe(email) {
  localStorage.setItem(REMEMBER_ME_KEY, email);
}

export function getRememberMe() {
  return localStorage.getItem(REMEMBER_ME_KEY);
}

export function deleteRememberMe() {
  localStorage.removeItem(REMEMBER_ME_KEY);
}

export function setRole(role) {
  localStorage.setItem(ROLE_KEY, role);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function cleanSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}
