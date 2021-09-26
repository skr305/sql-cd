import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterDomTest from './TestEntry/RouterDom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import RenderEntry from './SimplifyTest';
import {Provider} from 'mobx-react';
import store from './TestEntry/Todo/state';
import App from './App';

// RenderEntry.addEntry(App);
RenderEntry.addEntry(RouterDomTest);

const ReactCompileEntry = 0;
console.log(store);
ReactDOM.render(
  <React.StrictMode>
    <Provider {...store}>
      <App/>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
