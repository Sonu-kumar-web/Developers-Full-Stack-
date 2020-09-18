import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";

// Pass your all Reducers
export default combineReducers({ alert, auth });
