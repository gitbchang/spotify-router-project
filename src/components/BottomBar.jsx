import React, { Component } from 'react';

import { Navbar } from 'react-bootstrap';


class BottomBar extends Component {
  render() {
    return (
      <div>
        <Navbar className='sticky-footer' fixedBottom={true}>
          <div className='text-center' style={{'paddingTop': "15px"}} >B.Chang</div>
        </Navbar>
      </div>
    );
  }
}

export default BottomBar;