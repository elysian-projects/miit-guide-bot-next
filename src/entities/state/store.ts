import userReducer from "@/entities/state/reducers/user";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  userReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};
