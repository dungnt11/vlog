import { combineReducers } from "redux";

/**
 * auth reducer
 */
import { loginReducer } from "./auth/login"; 
import { registerReducer } from "./auth/register";
/**
 * err reducer
 */
import { loadErr } from "./err";
/**
 * ask reducer
 */
import { loadTagReducer } from "./load/loadTag";
import { askReducer } from "./ask/ask.reducer";

export default combineReducers({
  login: loginReducer,
  register: registerReducer,
  err: loadErr,
  tag: loadTagReducer,
  askReducer
});
