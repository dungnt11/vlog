import { REGISTER } from "../constants";

export const registerStart = (user, history) => ({
  type: REGISTER.START,
  payload: user,
  history
});

export const registerSuccess = user => ({
  type: REGISTER.SUCCESS,
  payload: user
});