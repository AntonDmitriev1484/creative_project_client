import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('in index.js');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

