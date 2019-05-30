import { LOGIN } from "../constants";

export const loginStartAction = (user, history) => ({
  type: LOGIN.START,
  payload: user,
  history
});

export const loginSuccess = user => ({
  type: LOGIN.SUCCESS,
  payload: user
});

export const loginFail = err => ({
  type: LOGIN.FAIL,
  payload: err
});
