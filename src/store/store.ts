import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as actionCreators from "./action-creators";

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(reducers, {},
	composeEnhancers(applyMiddleware(thunk)));

