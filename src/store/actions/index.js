import { REMOVE_CITY, ADD_CITY, ACTIVE_LINK, ADD_TO_CASH, CLEAR_LINK } from "../constants";

export const removeCity = (id) => ({ type: REMOVE_CITY, payload: id });
export const addCity = (id, city) => ({ type: ADD_CITY, payload: { id, city } });
export const activeLink = (city) => ({ type: ACTIVE_LINK, payload: city });
export const clearLink = () => ({ type: CLEAR_LINK });
export const addToCash = (id, city) => ({ type: ADD_TO_CASH, payload: { id, city } });
