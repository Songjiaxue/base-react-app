import React, { Component } from 'react';
import { Layout } from 'antd';
import './index.less';

const { Footer } = Layout;
 
class AppFooter extends Component{
  state = {}
  render() {
    return (
      <Footer className="app-footer">
        Header
      </Footer>
    );
  }
}
export default AppFooter;