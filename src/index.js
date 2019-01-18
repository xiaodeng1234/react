import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
//注意这个顺序上面两个引入的顺序不能弄反了
import {  
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import {
  Login,
  NotFound
} from './pages'

import App from './App';

import './index.less';

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Router>
    <Switch>
      <Route path="/admin" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Redirect to="/admin" from="/" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>
</LocaleProvider>,
  document.getElementById('root')
);
