import {observable,action,runInAction,} from 'mobx';

class UserInfo {
  @observable userInfo = {};
  constructor() {
    this.getUserInfo();
  }
  @action delUserInfo = () => {
    this.userInfo = {};
  };
  @action getUserInfo = async () => {
    const {status,data,message,} = await window.Get('admin/user/front/info');
    if (status !== 200) {
      console.error("获取用户信息失败:" + message);
    } else {
      runInAction(() => {
        this.userInfo = data;
        // this.MenuItems = filterMenuFromPowerList(RouterList,powerList);
      });
    }
  };
}

export default new UserInfo();
