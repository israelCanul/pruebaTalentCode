import { combineReducers } from "redux";
import SiteReducer from "./siteReducer";

const rootReducer = combineReducers({
  site: SiteReducer,
});

export default rootReducer;
