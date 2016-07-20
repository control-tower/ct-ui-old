import { SHOW_NOTIFICATION, CLEAR_NOTIFICATION } from '../constants';

const initialState = null;


export default function(state = initialState, action) {

    switch (action.type) {
        case SHOW_NOTIFICATION:
            return action.payload;
        case CLEAR_NOTIFICATION:
            return null;
        default:
            return state;
    }
};
