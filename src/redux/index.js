import { combineReducers } from 'redux';


import cameras from './cameras';
import seeds from './seeds';
import favorites from './favorites';


export default combineReducers({
  cameras,
  favorites,
  seeds,
});