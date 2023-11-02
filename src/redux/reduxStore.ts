import {
  Action,
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";

let rootReducer = combineReducers({
  profilePosts: profileReducer,
  msgPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<A extends Action, R = void> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;

export type AppStateType = ReturnType<RootReducerType>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>;
export default store;
