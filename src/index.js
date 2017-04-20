// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
  routes, document.getElementById('root')
);