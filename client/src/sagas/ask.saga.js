import { take, call, put } from "redux-saga/effects";
import { ASK } from "../constants";
import { postAsk } from "../apis/ask.api";

export function* _a(payload) {
  /**
   * xu ly data khi nhan duoc tu ASK.START
   */
  try {
    let result = yield postAsk(payload);
    let _res = result.data; // ket qua tra ve
    if (_res) {
    yield put({
      type: ASK.SUCCESS,
      payload: _res
    })
    } 
  } catch (err) {
    let _err = err.response.data ? err.response.data : "";
    if (_err) {
      yield put({
        type: ASK.FAIL,
        payload: _err
      })
    }
  }
}

export function* askMain() {
  while (true) {
    let { payload } = yield take(ASK.START);
    yield call(_a, payload);
  }
}
