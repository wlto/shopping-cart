import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import data from './data.js';

ReactDOM.render(
  <App data={data} />,
  document.getElementById('root')
);