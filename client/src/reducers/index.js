import { combineReducers } from "redux";

import { loginReducer } from "./auth/login"; // reducer xu ly login
import { loadErr } from "./err";

export default combineReducers({
  login: loginReducer,
  err: loadErr
});
