import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
