import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// import App from './components/App';
import HomePage from '../src/components/HomePage';


ReactDOM.render((
  <BrowserRouter>
    <Route path="/" component={HomePage}/>
  </BrowserRouter>
), document.getElementById('root'))