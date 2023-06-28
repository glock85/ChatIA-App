import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// states
import { chatHistorySlice } from "./slices";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
    chatHistorySlice,
});

export { rootPersistConfig, rootReducer };