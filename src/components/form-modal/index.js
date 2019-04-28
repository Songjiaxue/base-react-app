import React, {PureComponent,} from "react";
import {Modal,message,} from 'antd';
import PropTypes from "prop-types";
import CreateForm from "@components/create-form";
import { isString, } from "@util/helpers";
import "./index.less";

const formItemLayout = {
  labelCol: {
    xs: { span: 6, },
    sm: { span: 6, },
  },
  wrapperCol: {
    xs: { span: 6, },
    sm: { span: 16, },
  },
};

export default class CommonModal extends PureComponent {
  state = {
    show: false,
    loading: false,
    isAdd: false,
    info: {},
  };
  render() {
    const {show, loading,isAdd, info, } = this.state;
    const {title,className,cancelText,okText,filedItems,detailData,} = this.props;
    const prefixTitle = !isAdd ? `编辑${title}` : `新增${title}`;
    const detail = (isString(detailData) && !isAdd) ? `${detailData}/${info.id}` : detailData || {};
    return (
      <Modal
        destroyOnClose
        title={prefixTitle}
        visible={show}
        wrapClassName={`common-modal ${className}`}
        onCancel={this.onCancel}
        cancelText={cancelText}
        confirmLoading={loading}
        okText={okText}
        onOk={this.onOk}
      >
        <div className="modal-box">
          <CreateForm
            formItemLayout={formItemLayout}
            filedItems={filedItems}
            type={isAdd ? 'add' : 'edit'}
            detailData={detail}
            ref={ref => this.modalContentRef = ref}
            wrappedComponentRef={ref => this.modalContentWrappedRef = ref}
          />
        </div>
      </Modal>
    );
  }
  componentDidMount() {
  }
  hide =() => {
    this.setState({
      loading: false,
      show: false,
    });
  };
  show = (info) => {
    this.setState({
      show: true,
      isAdd: info.isAdd || false,
      info: info,
    });
  };
  onOk = () => {
    this.modalContentRef.validateFields((err,val) => {
      if (!err) {
        this.submitData(val);
      }
    })
  };
  async submitData(val) {
    const {addSrc, editSrc,onOk,submitFormat,} = this.props;
    const { loading,isAdd, } = this.state;
    const detailInfo = this.modalContentWrappedRef.getDetailInfo();
    if(loading){
      return ;
    }
    if (!addSrc && !editSrc) {
      this.hide();
      onOk && onOk(val);
      return;
    }
    const url = isAdd ? addSrc: editSrc;
    let params = {};
    if (submitFormat) {
      params = submitFormat(val, detailInfo);
    }
    if ((!isAdd && detailInfo.id)) {
      params.id = detailInfo.id;
    }
    params = this.clearUndefined(params);
    this.setState({
      loading: true
    });
    const {code,message:msg,} = await window.Post(url,params);
    if (code) {
      message.error(msg);
      this.setState({
        loading: false
      });
    } else {
      message.success("操作成功");
      this.hide();
      onOk && onOk();
    }
  }
  clearUndefined(data) {
    let res = {};
    Object.keys(data).forEach(z => {
      res[z] = (data[z] === undefined || data[z] === 'undefined') ? null: data[z];
    });
    return res;
  }
  onCancel = () => {
    const {onCancel,} = this.props;
    this.hide();
    onCancel && onCancel();
  };
}

CommonModal.propTypes = {
  title: PropTypes.string,
  cancelText: PropTypes.string,
  okText: PropTypes.string,
  addSrc: PropTypes.string,
  editSrc: PropTypes.string,
  filedItems: PropTypes.arrayOf( // 生成表单地址或者数组
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  detailData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]), // 获取详情地址或者详情数据
  detailDataFormat: PropTypes.func, // 通过接口获取到详情后格式化函数
  submitFormat: PropTypes.func, // 提交数据之前格式化
};

CommonModal.defaultProps = {
  title: "",
  cancelText: "取消",
  okText: "确定",
  isForm: true,
  detailData: {},
  detailDataFormat: x => x,
  submitFormat: (x) => x,
  autoPrefixTitle: true,
};

