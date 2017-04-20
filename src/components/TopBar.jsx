import React, { Component } from 'react';
import { firebaseApp } from '../firebase';
import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
};


class TopBar extends Component {
  
  handleTouchTap() {
  // alert('onTouchTap triggered on the title component');
  }
  signOut() {
    firebaseApp.auth().signOut();
  }   

  render() {
    return (
      <div>
        <AppBar title={<span style={styles.title}>Spats - Home</span>} onTitleTouchTap={this.handleTouchTap()} iconElementLeft={<IconButton>           
          </IconButton>} iconElementRight={
          <div>
            <FlatButton label="Your Data" />
            <FlatButton label="Suggestions" />
            <RaisedButton label="Sign Out" secondary={true} onClick={()=> this.signOut() }/>
          </div>} />
      </div>
    );
  }
}

export default TopBar;