import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import MyIcon from '@components/icon';
import config from '../../route';
import './index.less';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
 
@withRouter
class AppSider extends Component{
  state = {}
  renderMenu = (menu) => {
    return menu.map(v => {
      if (v.children) {
        return (
          <SubMenu 
            key={v.uri} 
            title={<span>{v.icon && <MyIcon type={v.icon} />}<span>{v.menu}</span></span>}
          >
            {this.renderMenu(v.children)}
          </SubMenu>
        );
      }
      return <Menu.Item key={v.uri}>{v.menu}</Menu.Item>;
    });
  }
  clickMenuItem = (e) => {
    console.log(e, 'e');
    const { history } = this.props;
    history.push(e.key);
  }
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
            this.renderMenu(config)
          }
        </Menu>
      </Sider>
    );
  }
}
export default AppSider;