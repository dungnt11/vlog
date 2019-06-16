import { take, call } from "redux-saga/effects";
import { ASK } from "../constants";
import { postAsk } from '../apis/ask.api'

export function* _a(payload) {
  /**
   * xu ly data khi nhan duoc tu ASK.START
   */
  let result = yield postAsk(payload);
  console.log(result)
}

export function* askMain() {
  while (true) {
    let { payload } = yield take(ASK.START);
    yield call(_a, payload);
  }
}
