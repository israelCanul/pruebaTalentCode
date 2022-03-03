import { FETCHDATA, TOGGLEMODAL } from "../actions/index";
const INITIAL_STATE = { items: [], itemSelected: null, modalIsOpen: false };

export default function state(state = INITIAL_STATE, action) {
  let newState = state;
  switch (action.type) {
    case FETCHDATA:
      newState = { ...state, items: action.payload.items };
      break;
    case TOGGLEMODAL:
      newState = {
        ...state,
        modalIsOpen: action.payload.open,
        itemSelected: action.payload.item,
      };
      break;
    default:
      newState = state;
  }
  return newState;
}
