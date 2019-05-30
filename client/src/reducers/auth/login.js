import { LOGIN } from "../../constants";

export const loginReducer = (state = {}, actions) => {
  switch (actions.type) {
    case LOGIN.START:
      return actions.payload;
    case LOGIN.SUCCESS:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};
