import { put, call, takeLatest } from "redux-saga/effects";

// import constant
import { LOGIN } from "../constants";

// import api
import { loginApi } from "../apis/login.api";

// import action
import { loginSuccess } from "../actions/login";

import { error } from '../actions/err';

export function* login({ payload, history }) {
  try {
    let res = yield call(loginApi, payload);
    yield put(loginSuccess(res.data));
    history.push("/");
  } catch (err) {
    yield put(error(err.response.data));
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN.START, login);
}
