import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./reducers";

const middlewares = [thunk, createLogger()];

export default createStore(
    combineReducers(reducers),
    applyMiddleware(...middlewares)
);
