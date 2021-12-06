import { REMOVE_CITY, ADD_CITY, ACTIVE_LINK, ADD_TO_CASH, CLEAR_LINK, ADD_FROM_CALENDAR } from "../constants";

export const removeCity = (id) => ({ type: REMOVE_CITY, payload: id });
export const addCity = (id, city, bool) => ({ type: ADD_CITY, payload: { id, city, bool } });
export const activeLink = (city) => ({ type: ACTIVE_LINK, payload: city });
export const clearLink = () => ({ type: CLEAR_LINK });
export const addToCash = (id, city) => ({ type: ADD_TO_CASH, payload: { id, city } });
export const addFromCalendar = (date, woeid, title) => ({ type: ADD_FROM_CALENDAR, payload: { date, woeid, title } });
