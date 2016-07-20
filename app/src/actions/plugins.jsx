import { BASE_API_URL, GET_PLUGINS } from '../constants';
import { showNotification } from './notification';
import fetch from '../utils/fetch';

export function getPlugins() {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/api/v1/plugin`, { method: 'GET' }).then((response) => response.json()).then((data) => {
      dispatch({ type: GET_PLUGINS, payload: data });
    });
  };
}

export function updatePlugin(id, plugin) {
  return (dispatch) => {
    fetch(`${BASE_API_URL}/api/v1/plugin/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(plugin),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then(() => {
      dispatch(showNotification('Plugin updated successfully'));
      dispatch(getPlugins());
    });
  };
}
