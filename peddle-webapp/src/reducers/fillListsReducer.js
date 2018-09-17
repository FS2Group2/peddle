import {FILL_CATEGORIES_LIST, FILL_CITIES_LIST, LOAD_TOP_EVENTS} from "../actions/actionsTypes";

const initialState = {
  cities: [],
  categories: [],
  topEvents: []
};

function fillListsReducer(state = initialState, action) {
  switch (action.type) {
    case FILL_CITIES_LIST:
      return {...state, cities: action.payload};
    case FILL_CATEGORIES_LIST:
      return {...state, categories: action.payload};
    case LOAD_TOP_EVENTS:
      return{...state, topEvents: action.payload};
    default:
      return state;
  }
}

export default fillListsReducer;