import { LOAD } from "../../constants";

export const loadTagReducer = (state = {}, actions) => {
  switch (actions.type) {
    case LOAD.SUCCESS:
      return actions.payload;
    case LOAD.FAIL:
      return actions.payload;
    default:
      return state;
  }
};
