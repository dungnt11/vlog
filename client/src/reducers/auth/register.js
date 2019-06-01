import { REGISTER } from "../../constants";

export const registerReducer = (state = {}, actions) => {
  switch (actions.type) {
    case REGISTER.START:
      return actions.payload;
    case REGISTER.SUCCESS:
      return {
        ...state,
        ...actions.payload
      };
    default:
      return state;
  }
};
