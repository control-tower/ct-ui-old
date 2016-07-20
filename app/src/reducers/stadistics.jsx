import { GET_STADISTICS } from '../constants';

const initialState = {};

export default function (state = initialState, action) {

  switch (action.type) {

  case GET_STADISTICS:
    return Object.assign({}, state, action.payload);


  default:
    return state;

  }

}
