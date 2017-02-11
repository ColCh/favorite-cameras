import React, {
  PureComponent,
  PropTypes,
} from 'react';


import Button from '../components/button';
import scrollToTop from '../utils/scroll-to-top';


export default class ToTopButton extends PureComponent {
  stopScrolling = null;
  
  handleClick() {
    console.log('ToTopButton: pressed, begin to scroll to top');
    this.stopScrolling = scrollToTop();
  }
  
  componentWillUnmount() {
    if (this.stopScrolling) {
      console.log('ToTopButton: stop scrolling on component unmount');
      this.stopScrolling();
    }
  }
  
  render() {
    return (
      <Button
        variant="primary"
        title="Scrolls current page to top"
        onClick={() => this.handleClick()}
      >
        ↑ TOP
      </Button>
    );
  }
}