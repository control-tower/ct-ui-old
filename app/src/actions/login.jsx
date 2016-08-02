import {BASE_API_URL, LOGIN, LOGIN_FAIL, GENERATE_TOKEN, LOGOUT} from '../constants';
import {showNotification} from './notification';
import fetch, {setBasicAuth, removeBasicAuth} from '../utils/fetch';

export function goToLogin() {
  window.location = `${BASE_API_URL}/auth?callbackUrl=${window.location.protocol + '//'+ window.location.host}`;
  return { type: 'noexist' };
}

export function login(username, password) {
  return (dispatch) => {
    if (username && password) {
      setBasicAuth(username, password);
    }

    fetch(`${BASE_API_URL}/auth/checkLogged`, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('401');
    }).then((data) => {
      dispatch({type: LOGIN, payload: data});
      dispatch(showNotification('Login correct'));
    }, () => {
      dispatch({type: LOGIN_FAIL});
      dispatch(showNotification('Login fail'));
    });
  };
}

export function logout() {
  return (dispatch) => {
    removeBasicAuth();
    fetch(`${BASE_API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        dispatch({type: LOGOUT});
        dispatch(showNotification('Logout correct'));
        return;
      }
    });
  };
}

export function generateToken() {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/auth/generate-token`, {
      method: 'GET',
      credentials: 'include'
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('401');
    }).then((data) => {
      dispatch(showNotification('Token generated correctly'));
      dispatch({type: GENERATE_TOKEN, payload: data});
    }, () => {
      // dispatch({ type: FAIL,  });
    });
  };
}
