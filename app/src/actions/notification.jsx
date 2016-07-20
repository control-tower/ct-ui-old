import { SHOW_NOTIFICATION, CLEAR_NOTIFICATION } from '../constants';

export function showNotification(message) {
  return { type: SHOW_NOTIFICATION, payload: message };
}

export function clearNotification() {
  return { type: CLEAR_NOTIFICATION };
}
