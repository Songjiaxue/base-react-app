import React from 'react';
import { Layout } from 'antd';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import AppHeader from '../common/header';
import AppFooter from '../common/footer';
import AppSider from '../common/sider';
import AppCrumb from '../common/crumb';
import RouteConfig from '../route';
import './index.less';

const { Content } = Layout;

@withRouter

class AppContainer extends React.Component {
  renderRoutes = (arr) => {
    let routes = [];
    arr.forEach(v => {
      if (v.children && v.children.length > 0) {
        routes = routes.concat(this.renderRoutes(v.children));
      }
      routes = routes.concat(
        <Route
          key={v.code}
          component={v.component}
          path={v.uri}
          breadcrumbName={v.menu}
          exact
        />,
      );
    });
    return routes.concat(
      (
        <Route
          render={() => {
            return (
              <Redirect to="/404" />
            );
          }}
          key="404"
        />
      ),
    );
  }

  render() {
    return (
      <Layout className="app-container">
        <AppHeader />
        <Layout className="app-container-box">
          <AppSider />
          <Content className="app-content">
            <div className="app-content-box">
              <AppCrumb />
              <div className="app-content-main">
                <Switch>
                  {
                    this.renderRoutes(RouteConfig)
                  }
                </Switch>
              </div>
            </div>
            <AppFooter />
          </Content>
          
        </Layout>
      </Layout>
    );
  }
}
export default AppContainer;
