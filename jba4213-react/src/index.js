import React from 'react';
import ReactDOM from 'react-dom/client';

import Nutrikit from './NutriKit.js';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
  // ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Nutrikit/>
  </React.StrictMode>
);