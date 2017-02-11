import React, {
  PropTypes,
  Component,
  isValidElement,
  cloneElement,
} from 'react';


import replaceParam from '../utils/replace-param-value';


const createAutoRefresh = (SomeComponent, params = {}) => {
  return class AutoRefreshHOC extends Component {
    constructor(props) {
      super(props);
      this.timeoutId = null;
      this.state = {
        seed: Date.now(),
      };
    }
    
    componentDidMount() {
      this.reloadImage();
    }
    
    componentWillUnmount() {
      this.clearTimeout();
    }
    
    clearTimeout() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
    
    queueImageReload() {
      const timeout = params.timeout || 1000;
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => this.reloadImage(), timeout);
      }
    }
    
    reloadImage() {
      this.clearTimeout();
      this.setState({
        seed: Date.now(),
      });
    }
    
    replaceRandomSeed(src) {
      // add random string to the end of src to prevent caching
      let seed = this.state.seed;
      return replaceParam(src, '_favCams_refresh_random', seed);
    }
    
    handleImageLoaded(src) {
      this.queueImageReload();
      this.props.onThumbLoad && this.props.onThumbLoad();
    }
    
    render() {
      const hocProps = {
        onThumbLoad: this.handleImageLoaded.bind(this),
        thumbSrc: this.replaceRandomSeed(this.props.thumbSrc),
      };
      
      return <SomeComponent {...this.props} {...hocProps} />;
    }
  }
};


export default createAutoRefresh;
