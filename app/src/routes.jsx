import React from 'react';
import { App, Dashboard, Endpoint, Plugin, Microservice, Login, Profile, User } from './containers';
import { Router, Route, IndexRoute } from 'react-router';


export default function (props) {
  return (
    <Router history={props.history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="plugins" component={Plugin} />
        <Route path="endpoints" component={Endpoint} />
        <Route path="microservices" component={Microservice} />
        <Route path="profile" component={Profile} />
        <Route path="login" component={Login} />
        <Route path="users" component={User} />
      </Route>
    </Router>
  );

}
