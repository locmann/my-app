import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  profilePosts: profileReducer,
  msgPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
