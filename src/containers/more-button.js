import React, {
  PureComponent,
  PropTypes,
} from 'react';


import { connect } from 'react-redux';


import Button from '../components/button';
import { loadCameras } from '../redux/cameras-thunks';


export class MoreButton extends PureComponent {
  handleClick() {
    console.log('MoreButton: loading more cameras');
    this.props.loadCameras();
  }
  
  render() {
    return (
      <Button
        variant="success"
        title="Loads more cameras"
        onClick={() => this.handleClick()}
      >
        MORE
      </Button>
    );
  }
}


export const mapDispatchToProps = {
  loadCameras,
};


export default connect(undefined, mapDispatchToProps)(MoreButton);