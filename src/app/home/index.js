import React, { Component } from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
// import { Get } from '../../api';
import './index.less';

@inject('user')
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'props');
    this.state = {};
  }
  componentDidMount() {
    window.Get('v1/web/user/detailsUser/1').then(r => {
      console.log(r, 'ooooooooooooooo');
    });
  }
  render() {
    return (
      <div>
        <Button type="primary">home</Button>
        <div className="app">123</div>
      </div>
    );
  }
}
export default Home;
