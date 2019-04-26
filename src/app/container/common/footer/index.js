import React, { Component } from 'react';
import { Layout } from 'antd';
import { SystemConfig } from '@util';
import './index.less';

const { Footer } = Layout;
 
class AppFooter extends Component{
  state = {}
  render() {
    return (
      <Footer className="app-footer">
        { SystemConfig.CopyRight }
      </Footer>
    );
  }
}
export default AppFooter;