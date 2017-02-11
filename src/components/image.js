import React, {
  PropTypes,
  Component,
} from 'react';


class Image extends Component {
  constructor(props) {
    super(props);
    this.timeoutId = null;
    this.handled = false; // FIXME May be use Promise to revolve race condition
  }
  
  componentWillUnmount() {
    this.clearLoadTimeout();
  }
  
  componentDidMount() {
    this.setupLoadTimeout();
    this.handled = false;
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props.src !== nextProps.src) {
      this.clearLoadTimeout();
      this.setupLoadTimeout();
      this.handled = false;
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    const { timeout, onLoad, onError, ...otherProps } = this.props;
    const { timeoutNext, onLoadNext, onErrorNext, ...otherPropsNext } = nextProps;
    
    for (const prop in otherProps) {
      if (otherProps[prop] !== otherPropsNext[prop]) {
        return true;
      }
    }
    
    return false;
  }
  
  setupLoadTimeout() {
    if (this.timeoutId) {
      throw new Error(`Image#setupLoadTimeout: called twice on <${this.props.src}>`);
    }
    const timeout = this.props.timeout;
    this.timeoutId = setTimeout(this.handleTimeout.bind(this), timeout);
  }
  
  clearLoadTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  
  handleTimeout() {
    if (this.handled) {
      return;
    }
    console.log(`Image: loading timed out <${this.props.src}>`);
    this.handled = true;
    this.props.onError();
  }
  
  handleLoad() {
    if (this.handled) {
      return;
    }
    this.handled = true;
    this.clearLoadTimeout();
    this.props.onLoad();
  }
  
  handleError() {
    if (this.handled) {
      return;
    }
    console.log(`Image: error loading <${this.props.src}>`);
    this.handled = true;
    this.clearLoadTimeout();
    this.props.onError();
  }
  
  render() {
    const { timeout, onLoad, onError, ...otherProps } = this.props;
        
    return (
      <img
        onLoad={this.handleLoad.bind(this)}
        onError={this.handleError.bind(this)}
        {...otherProps}
      />
    );
  }
}


Image.propTypes = {
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  timeout: PropTypes.number,
};


Image.defaultProps = {
  onLoad: () => {},
  onError: () => {},
  timeout: 10000,
};


export default Image;