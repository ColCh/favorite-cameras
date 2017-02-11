import { createSelector } from 'reselect';


export const SET_FAVORITES = 'Favorites/SET_FAVORITES';

export const setFavorites = (favorites) => ({
  favorites,
  type: SET_FAVORITES,
});


export const ADD_FAVORITE = 'Favorites/ADD_FAVORITE';

export const addFavorite = camera => ({
  camera,
  type: ADD_FAVORITE,
});


export const REMOVE_FAVORITE = 'Favorites/REMOVE_FAVORITE';

export const removeFavorite = camera => ({
  camera,
  type: REMOVE_FAVORITE,
});


const initialState = [];
    
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.favorites || state;
    case ADD_FAVORITE:
      const newState = state.slice(0);
      newState.push(action.camera);
      return newState;
    case REMOVE_FAVORITE:
      return state.filter(camera => camera.guid !== action.camera.guid);
    default:
      return state;
  }
};


const getFavoritesState = state => state.favorites;

export const getFavorites = createSelector(
  getFavoritesState,
  state => state,
);

export const isInFavorites = createSelector(
  getFavorites,
  favorites => someCamera => favorites.some(camera => camera.guid === someCamera.guid),
);