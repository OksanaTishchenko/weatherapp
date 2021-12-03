import { REMOVE_CITY, ADD_CITY } from "../constants";

export const removeCity = (id) => ({ type: REMOVE_CITY, payload: id });
export const addCity = (id, city) => ({ type: ADD_CITY, payload: { id, city } });