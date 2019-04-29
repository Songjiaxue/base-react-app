import React, {Component,} from "react";
import {withRouter, } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import Cookies from "js-cookie";
// import md5 from 'md5';
import { Form, Input,message, Button } from 'antd';
import MyIcon from '@components/icon';
import { SystemConfig } from "@util";
import {loginAccount,loginImgCode,} from "@util/regular";
import logoImg from '@assets/img/logo.png';
import "./index.less";



@inject('userState')
@observer
@Form.create()
@withRouter

class Login extends Component {
  state = {
    // random: (new Date()).getTime(),
    loading: false,
    pwdShow: false,
    focusItem: {
      account: '',
      password: '',
      imgCode: '',
    },
  };
  rules = {
    account:[
      {
        required: true,
        message: '请输入用户名',
      },
      {
        pattern: loginAccount,
        message: "请输入正确的用户名",
      },
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
    imgCode: [
      {
        required: true,
        message: '请输入验证码',
      },
      {
        pattern: loginImgCode,
        message: '请输入正确的验证码',
      },
    ],
  }
  renderActive = (e) => {
    e ? 
    this.setState({
      focusItem: Object.assign({
        account: '',
        password: '',
        imgCode: '',
      }, {
        [e]: 'active',
      }),
    }) :
    this.setState({
      focusItem: Object.assign({
        account: '',
        password: '',
        imgCode: '',
      },),
    });
  }
  render() {
    const {loading,pwdShow,focusItem,} = this.state;
    const {form,} = this.props;
    const { getFieldDecorator,} = form;
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="logo-bg">
            <div className="logo-bg-box">
              <img
                src={logoImg}
                alt=""
              />
            </div>
            <p className='system-name'>{SystemConfig.SystemName}</p>
          </div>
          <Form
            className={`login-form`}
          >
            <Form.Item className={`${focusItem.account}`}>
              {getFieldDecorator('username', {
                rules: this.rules.account,
              })(
                <Input
                  addonBefore={
                    <MyIcon
                      className="icon-JL_yonghuming"
                      type="icon-JL_yonghuming"
                    />
                  }
                  onFocus={() => this.renderActive('account')}
                  onBlur={() => this.renderActive('')}
                  autoComplete="off"
                  placeholder="请输入用户名"
                />
              )}
            </Form.Item>
            <Form.Item className={`${focusItem.password}`}>
              {getFieldDecorator('password', {
                rules: this.rules.password,
              })(
                <Input
                  addonBefore={
                    <MyIcon
                      className="icon-JL_lock"
                      type="icon-JL_lock"
                    />
                  }
                  addonAfter={
                    <MyIcon
                      onClick={this.toggleShowPwd}
                      className="icon-JL_yanjing icon-JL_chakanyanjingshishifenxi"
                      type={`${pwdShow ? 'icon-JL_yanjing' : 'icon-JL_chakanyanjingshishifenxi'}`}
                    />
                  }
                  onFocus={() => this.renderActive('password')}
                  onBlur={() => this.renderActive('')}
                  autoComplete="off"
                  placeholder="请输入密码"
                  type={!pwdShow ? 'password' : 'text'}
                />
              )}
            </Form.Item>
            {
            //   <Form.Item className={`${focusItem.imgCode}`}>
            //   {getFieldDecorator('imgCode', {
            //     rules: this.rules.imgCode,
            //   })(
            //     <Input
            //       addonBefore={
            //         <MyIcon
            //           className="icon-JL_yanzhengmatianchong"
            //           type='icon-JL_yanzhengmatianchong'
            //         />
            //       }
            //       addonAfter={
            //         <img
            //           src={`api/system/imgIdentifyingCode?t=${random}`}
            //           onClick={this.updateImg}
            //           className="img-code"
            //           alt=""
            //         />
            //       }
            //       onFocus={() => this.renderActive('imgCode')}
            //       onBlur={() => this.renderActive('')}
            //       autoComplete="off"
            //       placeholder="请输入验证码"
            //       type="text"
            //     />
            //   )}
            // </Form.Item>
            }
            <Button
              className="login-form-button"
              type="primary"
              onClick={this.submit}
              loading={loading}
            >
            登录
            </Button>
          </Form>
        </div>
        <p className="copy-right">{SystemConfig.CopyRight}</p>
      </div>
    );
  }
  // updateImg = () => {
  //   this.setState({
  //     random: new Date().getTime(),
  //   });
  // }
  /**
   * 表单校验
   * @param e
   * @returns {Promise<void>}
   */
  submit = async (e) => {
    e.preventDefault();
    const {form,} = this.props;
    form.validateFields((err,val) => {
      if (!err) {
        this.setState({
          loading: true,
        },() => {this.login(val);});
        return;
      }
    });
  };
  /**
   * 提交数据
   * @param params
   * @returns {Promise<void>}
   */
  login = async (params) => {
    const {history,userState} = this.props;
    const url = `auth/jwt/token`;
    // params.password = md5(params.password);
    const {status, data,message:msg,} = await window.Post(url,params);
    this.setState({
      loading: false,
    });
    if (status !== 200) {
      message.error(msg);
    } else {
      if (!data) {
        message.error("登录失败");
        return;
      }
      Cookies.set('SystemToken', data, {expires: 7,});
      userState.getUserInfo();
      history.push({
        pathname: '/',
      });
    }
  };
  /**
   * 切换密码显示
   */
  toggleShowPwd = () => {
    const {pwdShow,} = this.state;
    this.setState({
      pwdShow: !pwdShow,
    });
  }
}
export default  Login;