import { createSelector } from 'reselect';


export const ADD_CAMERAS = 'Cameras/ADD_CAMERAS';

export const addCameras = cameras => ({
  cameras,
  type: ADD_CAMERAS,
});


const initialState = {
  cameras: [],
};
    
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_CAMERAS:
      // FIXME denormalize state tree and use hash instead of array
      const cameraExists = camera => !!state.cameras.find(otherCam => otherCam.guid === camera.guid);
      const filteredCameras = action.cameras.filter(camera => !cameraExists(camera));
      return {
        ...state,
        cameras: state.cameras.concat(filteredCameras),
      };
    default:
      return state;
  }
};


const getCamerasState = state => state.cameras;

export const getCameras = createSelector(
  getCamerasState,
  state => state.cameras,
);