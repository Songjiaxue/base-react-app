import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import RouteConfig from '../../route';
import './index.less';

@withRouter
class AppCrumb extends React.Component {
  // 渲染面包屑，逐层取url，然后匹配面包屑数组
  renderCrumb = () => {
    const { location: { pathname } } = this.props;
    const pathSnippets = pathname.split('/').filter(i => i);
    const keys = this.findKeys(RouteConfig);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {keys[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    return [(
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
  }

  // 设置面包屑对象，key为url，value为面包屑名称
  findKeys = (arr) => {
    let obj = {};
    arr.forEach(v => {
      obj = {
        ...obj,
        [v.path]: v.name,
      };
      if (v.children && v.children.length > 0) {
        obj = {
          ...this.findKeys(v.children),
          ...obj,
        };
      }
    });
    return obj;
  }


  render() {
    return (
      <Breadcrumb className="app-crumb">
        {
          this.renderCrumb()
        }
      </Breadcrumb>
    );
  }
}
export default AppCrumb;
