import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import config from '../../route';
import './index.less';

const { Sider } = Layout;
 
class AppSider extends Component{
  state = {}
  render() {
    return (
      <Sider 
        className="app-sider"
        theme="light"
      >
        <Menu
          onClick={this.clickMenuItem}
          mode="inline"
          // defaultSelectedKeys={[store.type.type]}
          className="app-menu"
        >
          {
            config.map(v => <Menu.Item key={v.key}>{v.name}</Menu.Item>)
          }
        </Menu>
      </Sider>
    );
  }
}
export default AppSider;