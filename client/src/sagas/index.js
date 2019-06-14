import { all } from "redux-saga/effects";

import { loginSaga } from "./login.saga";
import { registerSaga } from "./register.saga";
import { loadTag } from "./load.saga";

export default function* rootSaga() {
  yield all([loginSaga(), registerSaga(), loadTag()]);
}
