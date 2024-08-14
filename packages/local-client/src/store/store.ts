import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import * as actionCreators from "./action-creators";
import { persistMiddleware } from "./middlewares/persist";

const composeEnhancers = composeWithDevTools({ actionCreators });

export const store = createStore(reducers, {},
	composeEnhancers(applyMiddleware(persistMiddleware, thunk)));

