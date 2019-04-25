import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './components/loading-component';

const AsyncHome = Loadable({
  loader: () => import('./app/home'),
  loading: LoadingComponent
});
const AsyncContainer = Loadable({
  loader: () => import('./app/container/home'),
  loading: LoadingComponent
});
const AsyncLogin = Loadable({
  loader: () => import('./app/login'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/login" component={AsyncLogin} />
        <Route path="/" component={AsyncContainer} />
      </Switch>
    );
  }
}
export default App;
