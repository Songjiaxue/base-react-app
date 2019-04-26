import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './index.less';

@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        首页
      </div>
    );
  }
}
export default Home;
