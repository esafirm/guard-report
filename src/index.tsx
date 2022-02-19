import reportWebVitals from './reportWebVitals';

import { AppRegistry } from 'react-native';
import App from './App';

import './index.css';

function runApp() {
  AppRegistry.registerComponent('App', () => App);
  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root'),
  });
}

if (process.env.NODE_ENV === 'production') {
  window.addEventListener('DOMContentLoaded', () => {
    runApp();
  });
} else {
  runApp();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
