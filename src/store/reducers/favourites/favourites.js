import { REMOVE_CITY, ADD_CITY } from "../../constants"

const initialState = {
  favourites: []
}

export function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_CITY: {
      // let idx = state.favourites.findIndex(item => item.id === action.payload)
      // //console.log(idx);
      // state.favourites.splice(idx, 1);
      return {
        favourites: state.favourites.filter(item => item.id !== action.payload)
      }
    }
    case ADD_CITY:
      return {
        favourites: [...state.favourites, { id: action.payload.id, title: action.payload.city }]
      }

    default:
      return state
  }
}