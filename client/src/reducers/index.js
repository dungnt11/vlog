import { combineReducers } from "redux";

import { loginReducer } from "./auth/login"; // reducer xu ly login
import { registerReducer } from "./auth/register";
import { loadErr } from "./err";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  err: loadErr
});
