import { REMOVE_CITY, ADD_CITY, ACTIVE_LINK, ADD_TO_CASH, CLEAR_LINK } from "../../constants"

const initialState = {
  favourites: [],
  activeLink: null,
  cashCities: []
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
        favourites: [...state.favourites, { id: action.payload.id, title: action.payload.city }]
      }
    case ACTIVE_LINK:
      return {
        ...state,
        activeLink: action.payload
      }
    case ADD_TO_CASH:
      return {
        ...state,
        cashCities: [...state.cashCities, { id: action.payload.id, city: action.payload.city }]
      }
    case CLEAR_LINK:
      return {
        ...state,
        activeLink: null
      }

    default:
      return state
  }
}