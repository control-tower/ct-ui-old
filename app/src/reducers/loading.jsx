import { SET_VISIBLE } from '../constants';

const initialState = {
  visible: false,
};

export default function (state = initialState, action) {

  switch (action.type) {

  case SET_VISIBLE:
    return Object.assign({}, state, { visible: action.payload });

  default:
    return state;

  }

}
