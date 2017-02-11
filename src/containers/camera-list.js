import React, {
  Component,
  PropTypes,
} from 'react';

import { connect } from 'react-redux';


import CameraListItem from '../components/camera-list-item';
import CameraView from '../components/camera-view';
import { loadCameras } from '../redux/cameras-thunks';
import { getCameras } from '../redux/cameras';
import { loadSeeds } from '../redux/seeds-thunks';
import { isInFavorites, getFavorites } from '../redux/favorites';
import { loadFavorites, addFavorite, removeFavorite } from '../redux/favorites-thunks';


export class CameraList extends Component {
  constructor(props) {
    super(props);
    this.props.loadSeeds();
    this.props.loadCameras();
    this.props.loadFavorites();
    
    this.state = {
      openedCamerasGuids: [],
      favorites: null,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    // Supposed to solver problem with "always fresh" favorites collection
    // This logic can be moved into HOC 
    if (this.state.favorites === null && nextProps.initialFavorites) {
      this.setState({ favorites: nextProps.initialFavorites });
    }
  }
  
  isCameraStretched(camera) {
    return this.state.openedCamerasGuids.includes(camera.guid);
  }
  
  handleStarPress(camera, isLiked) {
    console.log(`CameraList#handleStarPress: handle press on camera <${camera.title}>, is liked ? ${isLiked}`);
    
    if (isLiked) {
      this.props.removeFavorite(camera);
    } else {
      this.props.addFavorite(camera);
    }
  }
  
  toggleStretch(camera) {
    let newStretchedCameraGuids;
    if (this.isCameraStretched(camera)) {
      const filterCameraOut = guid => guid !== camera.guid;
      newStretchedCameraGuids = this.state.openedCamerasGuids.filter(filterCameraOut);
    } else {
      newStretchedCameraGuids = this.state.openedCamerasGuids.slice(0);
      newStretchedCameraGuids.push(camera.guid);
    }
    this.setState({
      openedCamerasGuids: newStretchedCameraGuids,
    });
  }
  
  renderCamera(camera) {   
    const isLiked = this.props.isCameraLiked(camera);
    const isStretched = this.isCameraStretched(camera);
    
    if (isStretched) {
      return (
        <CameraView
          key={camera.guid}
          description={camera.description}
          title={camera.title}
          thumbSrc={camera.thumbSrc}
          isLiked={isLiked}
          views={camera.totalViews}
          onStarClick={() => this.handleStarPress(camera, isLiked)}
          onCrossClick={() => this.toggleStretch(camera)}
        />
      );
    } else {
      return (
        <CameraListItem
          key={camera.guid}
          title={camera.title}
          thumbSrc={camera.thumbSrc}
          isLiked={isLiked}
          views={camera.totalViews}
          onStarClick={() => this.handleStarPress(camera, isLiked)}
          onClick={() => this.toggleStretch(camera)}
        />
      );
    }
  }
  
  render() {
    const favorites = this.state.favorites || [];
    
    return (
      <div>
        {favorites
          .concat(this.props.cameras)
          .map(camera => this.renderCamera(camera))}
      </div>
    );
  }
}


CameraList.propTypes = {
  cameras: PropTypes.array.isRequired,
  initialFavorites: PropTypes.array.isRequired,
  isCameraLiked: PropTypes.func.isRequired,
};

CameraList.defaultProps = {
  cameras: [],
  initialFavorites: [],
  isCameraLiked: () => false,
};


export const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  cameras: getCameras(state),
  initialFavorites: getFavorites(state),
  isCameraLiked: isInFavorites(state),
});

export const mapDispatchToProps = {
  loadSeeds,
  loadCameras,
  loadFavorites,
  removeFavorite,
  addFavorite,
};


export default connect(mapStateToProps, mapDispatchToProps)(CameraList);
