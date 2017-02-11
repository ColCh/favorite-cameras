import getCameras from '../utils/load-cameras';
import { addCameras } from './cameras';
import { saveSeeds } from './seeds-thunks';
import { getNextSeed } from './seeds';


export const loadCameras = (amount = 10) => async (dispatch, getState) => {
  const state = getState();
  const seed = getNextSeed(state);
  
  console.log(`Redux/Cameras/Thunks#loadCameras: loading <${amount}> cameras with seed <${seed}>`);
  
  try {
    const result = await getCameras(seed, amount);
    const { cameras, seeds } = result;
    dispatch(saveSeeds(seeds.next, seeds.this));
    
    console.log(`Redux/Cameras/Thunks#loadCameras: loaded cameras`);
    console.log(cameras);

    // rename props, throw away unneded data
    const processedCameras = cameras.map((camera) => {
      const {
        description,
        server,
        camera_name: title,
        camera: id,
        total_views: totalViews,
      } = camera;
      
      // FIXME not really a guid, but it's unique
      const guid = `id${id}serv${server}tit${title.length}desc${description.length}`;
      
      const thumbSrc = `https://streaming.ivideon.com/preview/live?server=${server}&camera=${id}`
      
      return {
        thumbSrc,
        description,
        server,
        title,
        totalViews,
        guid,
        id,
      };
    });

    dispatch(addCameras(processedCameras));
  } catch (e) {
    console.error('Redux/Cameras/Thunks#loadCameras: error while requesting cameras. Error follows');
    console.error(e);
  }
};