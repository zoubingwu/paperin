import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

import 'antd/dist/antd.css';

export const App: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
    </Router>
  );
};
