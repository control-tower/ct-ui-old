import { GET_PLUGINS } from '../constants';

const initialState = {};

export default function (state = initialState, action) {

  switch (action.type) {

  case GET_PLUGINS:
    return Object.assign({}, state, { list: action.payload });


  default:
    return state;

  }

}
