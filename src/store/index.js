import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./reducers/index";
import rootSaga from "./sagas/index";
import logger from "redux-logger";
import { isProduction } from "../config";
const persistConfig = {
  debug: false,
  key: "root",
  keyPrefix: "v.1",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware, logger))
);

// export const store = isProduction
//   ? createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware)))
//   : createStore(
//       persistedReducer,
//       compose(applyMiddleware(sagaMiddleware, logger))
//     );

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export default { store, persistor };
