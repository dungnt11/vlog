import { ASK } from "../constants";

export const startAsk = payload => ({
  type: ASK.START,
  payload
});

export const successAsk = payload => ({
  type: ASK.SUCCESS,
  payload
});

export const failAsk = err => ({
  type: ASK.FAIL,
  payload: err
});
