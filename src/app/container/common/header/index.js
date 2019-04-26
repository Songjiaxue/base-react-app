import React, { Component } from 'react';
import { Layout, Dropdown, Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { SystemConfig } from '@util'
import logoImg from '@assets/img/logo.png';
import './index.less';

const { Header } = Layout;

@inject('userState')
@observer
 
class AppHeader extends Component{
  state = {}
  menu = (
    <Menu onClick={this.topMenuClick}>
      <Menu.Item key="signOut">
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );
  render() {
    const { userState } = this.props;
    return (
      <Header className="app-header">
        <div className="logo-box">
          <div className="img-box">
            <img src={logoImg} alt=""/>
          </div>
          <span>{ SystemConfig.SystemName }</span>
        </div>
        <div className="user-info-box">
          <span>{ window.moment().format('YYYY-MM-DD HH:mm:ss') }</span>
          <Dropdown 
            overlay={this.menu}
            className="user-info-in"
          >
            <div>
              <span>{ userState.userInfo.username }</span>
              <Icon type="down" />
            </div>
          </Dropdown>
        </div>
      </Header>
    );
  }
}
export default AppHeader;