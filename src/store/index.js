import { observable, action } from 'mobx';

class UserInfo {
  @observable userinfo = {};
  constructor() {
    this.userinfo = {
      name: 'op',
      age: 10
    };
  }
  @action delUserInfo = () => {
    this.userinfo = {};
  };
}

export default new UserInfo();
