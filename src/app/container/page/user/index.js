import React, { Component } from 'react';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('user')
@observer
class User extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'props');
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button type="primary">user</Button>
        <div className="app">123</div>
      </div>
    );
  }
}
export default User;
