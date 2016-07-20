import { GET_ENDPOINTS } from '../constants';

const initialState = {};

export default function (state = initialState, action) {

  switch (action.type) {

  case GET_ENDPOINTS:
    return Object.assign({}, state, { list: action.payload });


  default:
    return state;

  }

}
