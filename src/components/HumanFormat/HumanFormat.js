import React, { Component } from 'react';

class HumanFormat extends Component {
  render() {
    return (
      <div className="human-text">
        <p >{this.props.text}</p>
      </div>
    );
  }
}

export default HumanFormat;