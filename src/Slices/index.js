import { combineReducers } from "redux";
import candidateReducer from "./Candidate/candidate.slice";

const rootReducer = combineReducers({
  candidate: candidateReducer
});

export default rootReducer;
