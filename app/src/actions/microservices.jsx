import { BASE_API_URL, GET_MICROSERVICES } from '../constants';
import { showNotification } from './notification';
import { showLoading } from './loading';
import fetch from '../utils/fetch';

export function getMicroservices() {
  return (dispatch) => {
    dispatch(showLoading(true));
    fetch(`${BASE_API_URL}/api/v1/microservice`, { method: 'GET' }).then((response) => response.json()).then((data) => {
      dispatch(showNotification('Microservices obtained successfully'));
      dispatch({ type: GET_MICROSERVICES, payload: data });
      dispatch(showLoading(false));
    });
  };
}
