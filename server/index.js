// server/index.js
'use strict';

// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 9000;

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use("/", routes);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static(path.resolve(__dirname, '../public')))
  .use('/', routes);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});