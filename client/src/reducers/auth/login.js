import _ from "lodash";

import { LOGIN } from "../../constants";
import authAxios from "../../configs/axios.config";

export const loginReducer = (state = { isAuth: false }, actions) => {
  switch (actions.type) {
    case LOGIN.START:
      return actions.payload;
    case LOGIN.SUCCESS:
      if (_.isEmpty(actions.payload)) {
        // check logout
        authAxios(false); // remove header axios
        localStorage.removeItem("jwt");
        return {
          isAuth: false
        };
      }
      return {
        isAuth: true,
        ...actions.payload
      };
    default:
      return state;
  }
};
