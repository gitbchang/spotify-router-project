import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from './TopBar';
import BottomBar from './BottomBar';

class App extends Component {

  render() {
    return (
      <div>
        <TopBar />
        <BottomBar />
      </div>
    )
  }
}

function mapStatetoProps(state) {
  console.log('state', state);
  return {};
}

export default connect(mapStatetoProps, null)(App);