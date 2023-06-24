import { combineReducers } from "redux";
import authReducer from './auth'
import currentUserReducer from "./currentUser";
import questionReducer from "./question";
import userReducer from "./users";


export default combineReducers({
    authReducer,currentUserReducer,questionReducer,userReducer
})