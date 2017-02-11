import {
  setFavorites,
  addFavorite as addToFavoriteState,
  removeFavorite as removeFromFavoriteState,
  getFavorites,
} from './favorites';


const STORAGE_KEY = 'Redux/Favorites/Storage';


export const loadFavorites = () => (dispatch, getState) => {
  console.log('Redux/Favorites/Thunks#loadFavorites: loadFavorites()');
  const storedInfo = localStorage.getItem(STORAGE_KEY);
  if (!storedInfo) {
    return;
  }
  try {    
    const favorites = JSON.parse(storedInfo);
    console.log(`Redux/Favorites/Thunks#loadFavorites: loaded favorites`);
    console.log(favorites);
    dispatch(setFavorites(favorites));
  } catch (e) {
    console.error('Redux/Favorites/Thunks#loadFavorites: error while loading favorites in loadFavorites(). Error follows');
    console.error(e);
  }
};


export const addFavorite = (camera) => (dispatch, getState) => {
  console.log(`Redux/Favorites/Thunks#addFavorite: add <${JSON.stringify(camera)}> to favorites`);
  dispatch(addToFavoriteState(camera));
  
  const state = getState();
  const favorites = getFavorites(state);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};


export const removeFavorite = (camera) => (dispatch, getState) => {
  console.log(`Redux/Favorites/Thunks#removeFavorite: remove <${JSON.stringify(camera)}> from favorites`);
  dispatch(removeFromFavoriteState(camera));
  
  const state = getState();
  const favorites = getFavorites(state);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};