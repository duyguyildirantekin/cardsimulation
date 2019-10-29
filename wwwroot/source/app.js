import React from 'react';
import ReactDOM from 'react-dom';
import Simulator from './containers/Simulator/Simulator';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
ReactDOM.render(
   <Simulator />,
   document.getElementById('root')
);
module.hot.accept();