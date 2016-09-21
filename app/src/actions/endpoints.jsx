import { BASE_API_URL, GET_ENDPOINTS } from '../constants';
import { showNotification } from './notification';
import { showLoading } from './loading';
import fetch from '../utils/fetch';

export function getEndpoints() {
  return (dispatch) => {
    dispatch(showLoading(true));
    fetch(`${BASE_API_URL}/api/v1/endpoint`, { method: 'GET' }).then((response) => response.json()).then((data) => {
      dispatch(showNotification('Endpoints obtained successfully'));
      dispatch({ type: GET_ENDPOINTS, payload: data });
      dispatch(showLoading(false));
    });
  };
}
