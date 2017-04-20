import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { logUser } from './actions/index';
import { firebaseApp } from './firebase';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  grey600,
  fullWhite,
} from '../node_modules/material-ui/styles/colors';
import spacing from '../node_modules/material-ui/styles/spacing';
import {fade} from '../node_modules/material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto:300, Helvetica Neue, Arial, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: '#1DB954',
    primary2Color: '#1DB954',
    primary3Color: grey600,
    accent1Color: '#191414',
    accent2Color: '#191414',
    accent3Color: '#191414',
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: fullWhite,
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
});

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user) {
    console.log('user has sign in or up', user);
    const { email } = user;
    store.dispatch(logUser(email));
    browserHistory.push('/app');
  } else {
    console.log('user has signed out or still needs to sign in');
    browserHistory.replace('/signin');
  }
});




module.exports = ( 
<Provider store={store}>
  <MuiThemeProvider muiTheme={muiTheme}>
  <Router path="/" history={browserHistory}>
    <Route path="/app" component={App} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Router>
  </MuiThemeProvider>
</Provider>
  );


