import { setSeeds } from './seeds';


const STORAGE_KEY = 'Redux/Seeds/Storage';


export const loadSeeds = () => (dispatch, getState) => {
  console.log('Redux/Seeds/Thunks#loadSeeds: loadSeeds()');
  const storedInfo = localStorage.getItem(STORAGE_KEY);
  if (!storedInfo) {
    return;
  }
  try {    
    const seeds = JSON.parse(storedInfo);
    console.log(`Redux/Seeds/Thunks#loadSeeds: loaded next <${seeds.next}> and current <${seeds.current}> seeds`);
    dispatch(setSeeds(seeds.next, seeds.current));
  } catch (e) {
    console.error('Redux/Seeds/Thunks#loadSeeds: error while loading seeds in loadSeeds(). Error follows');
    console.error(e);
  }
};


export const saveSeeds = (next, current) => (dispatch, getState) => {
  console.log(`Redux/Seeds/Thunks#saveSeeds: saveSeeds() next <${next}> and current <${current}>`);
  const seeds = { next, current };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  dispatch(setSeeds(next, current));
};