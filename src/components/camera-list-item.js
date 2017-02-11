import React, {
  PureComponent,
  PropTypes,
} from 'react';


import handleOffline from  './handle-offline-hoc';
import BaseCameraCard from './base-camera-card';


class CameraListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.DecoratedCard = handleOffline(BaseCameraCard, 10 * 1e3);
  }
  
  render() {
    const { props, DecoratedCard } = this;
    
    return (
        <DecoratedCard
          title={props.title}
          thumbSrc={props.thumbSrc}
          isLiked={props.isLiked}
          views={props.views}
          onStarClick={props.onStarClick}
          onThumbClick={props.onClick}
          onTitleClick={props.onClick}
      />
    );
  }
}


CameraListItem.propTypes = {
  thumbSrc: PropTypes.string.isRequired,
  isLiked: PropTypes.bool,
  title: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default CameraListItem;
