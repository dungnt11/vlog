import { takeLatest, call, put } from "redux-saga/effects";

import { REGISTER } from "../constants";
import { error } from "../actions/err";
import { registerApi } from "../apis/register.api";

export function* register({ payload, history }) {
  try {
    yield call(registerApi, payload);
    yield history.push("/"); // xong thi ve trang chu
  } catch (err) {
    yield put(error(err));
  }
}

export function* registerSaga() {
  yield takeLatest(REGISTER.START, register);
}
