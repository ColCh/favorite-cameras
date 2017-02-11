import React, {
  PropTypes,
  PureComponent,
} from 'react';


import Button from './button';
import BaseCameraCard from './base-camera-card';
import handleOffline from  './handle-offline-hoc';
import handleAutoRefresh from  './auto-refresh-hoc';


class CameraView extends PureComponent {
  constructor(props) {
    super(props);
    this.DecoratedCard = (
      handleAutoRefresh(
        handleOffline(
          BaseCameraCard
        , 3 * 1e3)
      , { timeout: 3 * 1e3 })
    );
  }
  
  
  renderThumbIcons() {
    return (
      <Button variant="transparent" title="Closes camera" onClick={this.props.onCrossClick}>❌</Button>
    );
  }
  
  render() {
    const { props, DecoratedCard } = this;
    
    return (
      <DecoratedCard
        isStretch={true}
        isOffline={props.isOffline}
        title={props.title}
        thumbIcons={this.renderThumbIcons()}
        thumbSrc={props.thumbSrc}
        description={props.description}
        isLiked={props.isLiked}
        views={props.views}
        onStarClick={props.onStarClick}
        onThumbClick={props.onClick}
        onTitleClick={props.onClick}
      />
    );
  }
}

CameraView.propTypes = {
  isOffline: PropTypes.bool,
  thumbSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isLiked: PropTypes.bool,
  title: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  onStarClick: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onCrossClick: PropTypes.func.isRequired,
};


export default CameraView;