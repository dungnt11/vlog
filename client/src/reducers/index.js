import { combineReducers } from "redux";

import { loginReducer } from "./auth/login"; // reducer xu ly login
import { registerReducer } from "./auth/register";
import { loadErr } from "./err";
import { loadTagReducer } from "./load/loadTag";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  err: loadErr,
  tag: loadTagReducer
});
