import { BASE_API_URL, GET_STADISTICS } from '../constants';
import { showNotification } from './notification';
import { showLoading } from './loading';
import fetch from '../utils/fetch';

function formatDate(date) {
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${monthIndex}-${day}-${year}`;
}
function orderRequestByDay(r1, r2) {
  const r1d = new Date(`${r1._id.month}-${r1._id.day}-${r1._id.year}`);
  const r2d = new Date(`${r2._id.month}-${r2._id.day}-${r2._id.year}`);
  return r1d - r2d;
}

function orderRequestByNum(r1, r2) {
  return r2.count - r1.count;
}

function orderRequestBySum(r1, r2) {
  return r2.sum - r1.sum;
}


export function getStadistics(fromDate, toDate) {
  return (dispatch) => {
    dispatch(showLoading(true));
    const from = formatDate(fromDate);
    const to = formatDate(toDate);

    const promises = [];
    promises.push(fetch(`${BASE_API_URL}/api/v1/stadistic/avgByRequest?from=${from}&to=${to}`, { method: 'GET' }).then((response) => response.json()));
    promises.push(fetch(`${BASE_API_URL}/api/v1/stadistic/requestByDay?from=${from}&to=${to}`, { method: 'GET' }).then((response) => response.json()));
    promises.push(fetch(`${BASE_API_URL}/api/v1/stadistic/countRequestToday`, { method: 'GET' }).then((response) => response.json()));
    promises.push(fetch(`${BASE_API_URL}/api/v1/stadistic/countRequestLastWeek`, { method: 'GET' }).then((response) => response.json()));
    promises.push(fetch(`${BASE_API_URL}/api/v1/stadistic/countRequestTodayByCountry`, { method: 'GET' }).then((response) => response.json()));

    Promise.all(promises).then((data) => {
      dispatch(showNotification('Stadistics obtained successfully'));
      dispatch({ type: GET_STADISTICS, payload: {
        timeByRequest: data[0].sort(orderRequestBySum),
        requestByDay: data[1].sort(orderRequestByDay),
        countRequestToday: data[2],
        countRequestLastWeek: data[3],
        countRequestTodayByCountry: data[4].sort(orderRequestByNum),
      } });
      dispatch(showLoading(false));
    }, () => {
      dispatch(showNotification('Error obtaining stadistics'));
      dispatch(showLoading(false));
    });

  };
}
