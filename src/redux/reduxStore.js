import { combineReducers, legacy_createStore as createStore } from "redux";
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from "./usersReducer";

let reducers = combineReducers({
    profilePosts: profileReducer,
    msgPage: dialogsReducer,
    usersPage: usersReducer
});

let store = createStore(reducers);

window.store = store

export default store;