import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateAccount from './components/pages/CreateAccount/CreateAccount.js'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreateAccount />
  </React.StrictMode>
);
