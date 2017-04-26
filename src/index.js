// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute, IndexLink } from 'react-router';
import { firebaseApp } from './firebase';
// Redux imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { syncHistory, routerMiddleware, routeReducer  } from 'react-router-redux';
import { createHistory } from 'history';
// import { logUser } from './actions/index';

// Components
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SpotifyUser from './components/SpotifyUser';
import Error from './components/Error';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
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

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


// const store = createStore(reducer);

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore);
const store = createStoreWithMiddleware(reducer);

/* 
// automatically push user to the app if they have logged in

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

<Route path="/user/:accessToken/:refreshToken" component={SpotifyUser} />
<Route path="/error/:errorMsg" component={Error} />
*/


ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={browserHistory}>
          <Route path="/" >
            <IndexRoute component={SignIn} />
            <Route path="/app" component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/user/:accessToken/:refreshToken" component={SpotifyUser} />
            <Route path="/error/:errorMsg" component={Error} />
          </Route>
        </Router>
      </MuiThemeProvider>
  </Provider>, 
  document.getElementById('root')
);