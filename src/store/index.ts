import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import storage from "../utils/storage";
import { authenticatedSuccess } from "../utils/session";

export interface ActionType {
  type: string;
  payload?: any;
}

export interface UserInfoType {
  username?: string;
  phone?: string;
  userId?: number | string;
  token?: string;
  age?: number;
}

const storageUserInfo: UserInfoType = storage.getItem("userInfo") || {};

const login = (
  userInfo: UserInfoType = storageUserInfo,
  action: ActionType
) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...action.payload };
    case "LOGIN_SUCCESS":
      authenticatedSuccess(action.payload.token);
      storage.setItem("userInfo", action.payload);
      return { ...action.payload };
    case "LOGIN_FAIL":
      return { ...action.payload };
    default:
      return userInfo;
  }
};

const reducer = combineReducers({ login });

const store = createStore(reducer, applyMiddleware(logger));

export default store;
