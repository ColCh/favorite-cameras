import React, {
  PureComponent,
  PropTypes,
} from 'react';


import './base-camera-card.css';
import Button from './button';
import Image from './image';


class BaseCameraCard extends PureComponent {
  state = {
    isOffline: false,
  };

  handleThumbLoadFail() {
    this.setState({
      isOffline: true,
    });
  }
  
  renderThumbIcons() {
    const { thumbIcons } = this.props;
    
    if (thumbIcons) {
      return (
        <div className="Camera-List-Item__thumb-icons">
          {thumbIcons}
        </div>
      );
    }
    
    return null;
  }
  
  renderStar() {
    let buttonTitle;
    let icon;
    
    if (this.props.isLiked) {
      buttonTitle = 'Remove from favorites';
      icon = (
        <span className="Camera-List-Item__bookmark Camera-List-Item__bookmark--active">⭐️</span>
      );
    } else {
      buttonTitle = 'Add to favorites';
      icon = (
        <span className="Camera-List-Item__bookmark">⭐️</span>
      );
    }
    
    return (
      <Button variant="transparent" title={buttonTitle} onClick={this.props.onStarClick}>
        {icon}
      </Button>
    );
  }
  
  renderDescription() {
    const { description } = this.props;
    
    if (description) {
      return (
        <div className="Camera-List-Item__description">
          {description}
        </div>
      );
    }
    
    return null;
  }
  
  renderThumb() {
    const {
      thumbSrc,
      title,
      isStretch,
      onThumbLoad,
      onThumbLoadFail,
      imageLoadTimeout,
    } = this.props;
        
    return (
      <Image
        timeout={imageLoadTimeout}
        onLoad={onThumbLoad}
        onError={onThumbLoadFail}
        className={`Camera-List-Item__thumb-image${isStretch ? ' Camera-List-Item__thumb-image--stretch' : ''}`}
        src={thumbSrc}
        alt={`${title} thumbnail`}
        onClick={this.props.onThumbClick}
      />
    );
  }

  renderOffline() {
    const { onRefreshClick, thumbSrc } = this.props;
    
    return (
      <div className="Camera-List-Item__thumb-offline">
        <div className="Camera-List-Item__thumb-offline-text">Camera is offline.</div>
        <Button variant="ghost" title="Try to load image again" onClick={() => onRefreshClick(thumbSrc)}>REFRESH</Button>
      </div>
    );
  }
  
  render() {
    const {
      isOffline,
      isStretch,
      views,
      title,
    } = this.props;
    
    return (
      <div className={`Camera-List-Item${isStretch ? ' Camera-List-Item--stretch' : ''}`}>
        <div className={`Camera-List-Item__thumb${isStretch ? ' Camera-List-Item__thumb--stretch':''}`}>
          {this.renderThumbIcons()}
          {isOffline ? this.renderOffline() : this.renderThumb()}
        </div>
        <div className="Camera-List-Item__info">
          <div className="Camera-List-Item__top">
            <a className="Camera-List-Item__title" onClick={this.props.onTitleClick} title="Camera name">{title}</a>
            {this.renderStar()}
          </div>
          {this.renderDescription()}
          <div className="Camera-List-Item__bottom">
            <span className="Camera-List-Item__views">
              TOTAL VIEWS: {views}
            </span>
          </div>
        </div>
      </div>
    );
  }
}


BaseCameraCard.propTypes = {
  description: PropTypes.string,
  thumbIcons: PropTypes.any,
  thumbSrc: PropTypes.string.isRequired,
  isOffline: PropTypes.bool,
  isLiked: PropTypes.bool,
  isStretch: PropTypes.bool,
  title: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  imageLoadTimeout: PropTypes.number,
  onStarClick: PropTypes.func,
  onThumbClick: PropTypes.func,
  onThumbLoadFail: PropTypes.func,
  onThumbLoad: PropTypes.func,
  onTitleClick: PropTypes.func,
  onRefreshClick: PropTypes.func,
};


BaseCameraCard.defaultProps = {
  description: '',
  thumbIcons: null,
  isOffline: false,
  isLiked: false,
  isStretch: false,
  imageLoadTimeout: 10 * 1e3,
  onStarClick: () => {},
  onThumbClick: () => {},
  onThumbLoadFail: () => {},
  onThumbLoad: () => {},
  onTitleClick: () => {},
  onRefreshClick: () => {},
};


export default BaseCameraCard;