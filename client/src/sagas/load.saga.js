import { takeLatest, call, put } from "redux-saga/effects";

import { LOAD } from "../constants";
import { loadTagApi } from "../apis/loadtag.api";

export function* handleLoadTag() {
  /**
   * Load tag tu server
   */
  try {
    let result = yield call(loadTagApi, null);
    yield put({
      type: LOAD.SUCCESS,
      payload: result.data
    });
  } catch(err) {
    yield put({
      type: LOAD.FAIL,
      payload: err
    })
  }
}

export function* loadTag() {
  yield takeLatest(LOAD.START, handleLoadTag);
}
