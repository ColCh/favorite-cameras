import React, {
  PropTypes,
} from 'react';


import './button.css';


class Button extends React.Component {
  render() {
    const { children, variant, title, onClick } = this.props;
    
    return (
      <button
        className={`button button--${variant}`}
        title={title}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'success', 'ghost', 'transparent']),
  onClick: PropTypes.func,
};


Button.defaultProps = {
  variant: 'primary',
  onClick: () => {},
};


export default Button;