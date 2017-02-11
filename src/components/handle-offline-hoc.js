import React, {
  PropTypes,
  Component,
  isValidElement,
  cloneElement,
} from 'react';


import replaceParam from '../utils/replace-param-value';


const handleOffline = (SomeComponent, timeout = 10 * 1e3) => {
  return class OfflineHandler extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOffline: false,
        seed: Date.now(),
      }      
    }
    
    replaceRandomSeed(src) {
      // add random string to the end of src to prevent caching
      let seed = this.state.seed;
      return replaceParam(src, '_favCams_offline_random', seed);
    }

    onLoadError() {
      this.setState({
        isOffline: true,
        seed: Date.now(),
      });
      this.props.onRefreshClick && this.props.onRefreshClick();
    }
    
    onRetryClick() {
      this.setState({
        isOffline: false,
        seed: Date.now(),
      });
      this.props.onThumbLoadFail && this.props.onThumbLoadFail();
    }
    
    render() {
      const { isOffline } = this.state;

      const hocProps = {
        isOffline,
        imageLoadTimeout: timeout,
        thumbSrc: this.replaceRandomSeed(this.props.thumbSrc),
        onThumbLoadFail: this.onLoadError.bind(this),
        onRefreshClick: this.onRetryClick.bind(this),
      };
      
      return <SomeComponent {...this.props} {...hocProps} />;
    }
  }
};


export default handleOffline;