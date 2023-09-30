import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import profileReducer from './profileReducer'
import dialogsReducer from './dialogsReducer'
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    profilePosts: profileReducer,
    msgPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store

export default store;