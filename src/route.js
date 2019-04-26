import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import Loadable from 'react-loadable';
import LoadingComponent from '@components/loading-component';

const AsyncContainer = Loadable({
  loader: () => import('@app/container/home'),
  loading: LoadingComponent,
  delay: 300,
});
const AsyncLogin = Loadable({
  loader: () => import('@app/login'),
  loading: LoadingComponent,
  delay: 300,
});

class App extends Component {
  render() {
    
    return (
      <Switch>
        <Route exact path="/login" component={AsyncLogin} />
        <Route 
          path="/" 
          render={() => {
            return Cookie.get('SystemToken') ? <AsyncContainer /> : <Redirect to="/login" />;
          }}
        />
      </Switch>
    );
  }
}
export default App;
