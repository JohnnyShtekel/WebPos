import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import Main from '../components/Main.js';
import Login from '../components/Login.js';

const Routes = () => {
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
      <Route path="/" component={Main}/>
      <Route path="/login" component={Login}/>
        
    </Router>
  );
};

export default Routes;
