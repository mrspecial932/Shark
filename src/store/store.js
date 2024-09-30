import { createStore, combineReducers , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {provider , tokens , exchange} from "./reducer"

const reducer = combineReducers({
    provider, tokens, exchange 
})
const initalState = {}
const middleware = [thunk]

const store = createStore(reducer , initalState , composeWithDevTools(applyMiddleware(...middleware)))

export default store