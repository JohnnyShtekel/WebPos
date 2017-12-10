import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import Main from '../components/Main.js';
import Login from '../components/Login';
import Register from '../components/RegisterModal';
import KeyPad from '../components/KeyPad';


const Routes = () => {
  return (

    <Router  onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
      <Route path="/" component={Login}/>
          <Route path="/main" component={Main}/>
          <Route path="/register" component={Register}/>

    </Router>
  );
};

export default Routes;
