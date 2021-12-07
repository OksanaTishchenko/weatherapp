import { REMOVE_CITY, ADD_CITY, ACTIVE_LINK, ADD_TO_CASH, CLEAR_LINK, ADD_FROM_CALENDAR } from "../../constants";

const initialState = {
  favourites: [],
  activeLink: null,
  cashCities: [],
  activeCalendar: null
}

export function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CITY:
      return {
        ...state,
        favourites: state.favourites.filter(item => item.id !== action.payload)
      }
    case ADD_CITY:
      return {
        ...state,
        favourites: [...state.favourites, { id: action.payload.id, title: action.payload.city, isAdded: action.payload.isAdd }]
      }
    case ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }
    case ADD_TO_CASH:
      return {
        ...state,
        cashCities: [...state.cashCities, action.payload]
      }
    case CLEAR_LINK:
      return {
        ...state,
        activeLink: null
      }
    case ADD_FROM_CALENDAR:
      return {
        ...state,
        activeCalendar: action.payload
      }

    default:
      return state
  }
}