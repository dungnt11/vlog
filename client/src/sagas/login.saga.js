import { put, call, takeLatest } from "redux-saga/effects";

// import constant
import { LOGIN } from "../constants";

// import api
import { loginApi } from "../apis/login.api";

// import action
import { loginSuccess } from "../actions/login";
import { error } from "../actions/err";

import setHeader from "../configs/axios.config";

export function* login({ payload, history }) {
  try {
    let res = yield call(loginApi, payload);
    yield put(loginSuccess(res.data));
    // save token to client
    yield localStorage.setItem("jwt", JSON.stringify(res.data));
    // set token global
    yield setHeader(res.data.token);
    yield history.push("/");
  } catch (err) {
    if (err.response) {
      yield put(error(err.response.data));
    }
  }
}

export function* loginSaga() {
  yield takeLatest(LOGIN.START, login);
}
