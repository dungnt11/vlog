import { ASK } from "../../constants";

export const askReducer = (state = {}, actions) => {
  switch (actions.type) {
    case ASK.SUCCESS:
      return actions.payload;
    case ASK.FAIL:
      return actions.payload;
    default:
      return state;
  }
};
