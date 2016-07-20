import { LOGIN_FAIL, LOGIN, GENERATE_TOKEN, LOGOUT } from '../constants';

const initialState = {
  correct: null,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case LOGIN_FAIL:
    return Object.assign({}, state, { correct: false });
  case LOGIN:
    return Object.assign({}, state, { correct: true, user: action.payload });
  case LOGOUT:
    return Object.assign({}, state, { correct: false, user: null });
  case GENERATE_TOKEN:
    return Object.assign({}, state, { token: action.payload.token });


  default:
    return state;

  }

}
