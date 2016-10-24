import { SET_VISIBLE } from '../constants';
export function showLoading(visible) {
  return {
    type: SET_VISIBLE,
    payload: visible,
  };
}
