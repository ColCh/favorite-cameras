import { createSelector } from 'reselect';


export const SET_SEEDS = 'Seeds/SET_SEEDS';

export const setSeeds = (next, current) => ({
  next,
  current,
  type: SET_SEEDS,
});


const initialState = {
  next: '',
  current: '',
};
    
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_SEEDS:
      return {
        ...state,
        next: action.next,
        current: action.current,
      };
    default:
      return state;
  }
};


const getSeedsState = state => state.seeds;

export const getCurrentSeed = createSelector(
  getSeedsState,
  state => state.current,
);

export const getNextSeed = createSelector(
  getSeedsState,
  state => state.next,
);