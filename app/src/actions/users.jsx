import { BASE_API_URL, GET_USERS } from '../constants';
import { showNotification } from './notification';
import { showLoading } from './loading';
import fetch from '../utils/fetch';

export function getUsers() {
  return (dispatch) => {
    dispatch(showLoading(true));
    fetch(`${BASE_API_URL}/auth/user`, { method: 'GET' }).then((response) => response.json()).then((data) => {
      dispatch(showNotification('Users obtained successfully'));
      dispatch({ type: GET_USERS, payload: data });
      dispatch(showLoading(false));
    });
  };
}

export function updateUser(id, user) {
  return (dispatch) => {
    dispatch(showLoading(true));
    fetch(`${BASE_API_URL}/auth/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then(() => {
      dispatch(showNotification('User updated successfully'));
      dispatch(getUsers());
      dispatch(showLoading(false));
    });
  };
}
