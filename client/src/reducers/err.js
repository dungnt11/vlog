import { LOGIN } from "../constants";

const loadErr = (state = {}, actions) => {
  switch (actions.type) {
    case LOGIN.FAIL:
      return actions.payload;
    default:
      return state;
  }
};

export { loadErr };
