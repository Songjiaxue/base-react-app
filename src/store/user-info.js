import {observable,action,runInAction,} from 'mobx';
import Cookie from 'js-cookie';

class UserInfo {
  @observable userInfo = {};
  constructor() {
    Cookie.get('SystemToken') && this.getUserInfo();
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
      });
    }
  };
}

export default new UserInfo();
