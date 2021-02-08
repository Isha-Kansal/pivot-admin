import { all } from "redux-saga/effects";
import LoginByAdminWatcher from "../../views/store/sagas";
export default function* rootSaga() {
  yield all([LoginByAdminWatcher()]);
}
