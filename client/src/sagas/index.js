import { fork, all } from "redux-saga/effects";

import { loginSaga } from "./login.saga";
import { registerSaga } from "./register.saga";
import { loadTag } from "./load.saga";
import { askMain } from "./ask.saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(registerSaga),
    fork(loadTag),
    fork(askMain)
  ]);
}
