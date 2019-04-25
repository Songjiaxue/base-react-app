import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.less';

const { Header } = Layout;
 
class AppHeader extends Component{
  state = {}
  render() {
    return (
      <Header className="app-header">
        Header
      </Header>
    );
  }
}
export default AppHeader;