import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './components/loading-component';

const AsyncHome = Loadable({
  loader: () => import('./app/home'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncHome} />
      </Switch>
    );
  }
}
export default App;
