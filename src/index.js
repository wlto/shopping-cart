import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';
import data from './data.js';

ReactDOM.render(
  <BrowserRouter>
  <App data={data} />
  </BrowserRouter>
  , document.getElementById('root')
);