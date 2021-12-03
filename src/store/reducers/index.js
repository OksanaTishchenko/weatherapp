import { combineReducers } from "redux";
import { favouritesReducer } from "./favourites/favourites";

export const rootReducer = combineReducers({
  favourites: favouritesReducer
})