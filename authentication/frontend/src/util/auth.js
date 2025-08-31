import {redirect} from "react-router-dom";

export const getToken = () => {
  const token =  localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  console.log(tokenDuration);

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token;
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const setToken = (token, userId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  window.location.href = '/auth?mode=login';
};

export const checkAuthLoader = () => {
  if (!isAuthenticated()) {
    return redirect('/auth?mode=login');
  }

  return null;
};


export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('tokenExpiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}
