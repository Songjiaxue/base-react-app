import React, { Component } from 'react';
import CreateTable from '@components/create-table';
import FormModal from "@components/form-modal/index";
import EditModalConfig from "./user_update_form_modal_config";
import AddModalConfig from "./user_add_form_modal_config";

class UserManager extends Component {

  TableConfig = {
    url: "web/user/listByPage",
    searchItems: [
      {
        type: "input",
        name: "departmentName",
        title: "单位名称",
        show: true,
        otherParams: {},
      },
      {
        type: "input",
        name: "keyWord",
        title: "关键字",
        show: true,
        placeholder: "请输入姓名或者账号",
        otherParams: {},
      },
    ],
    searchActionItems: [
      {
        title: "新增用户",
        type: "add",
        url: "",
        onClick: () => {
				  this.goAdd();
				},
      },
    ],
    columns: [
      {
        title: "姓名",
        dataIndex: "name",
      },
      {
        title: "账号",
        dataIndex: "account",
      },
      {
        title: "单位名称",
        dataIndex: "departmentName",
      },
      {
        title: "是否可用状态",
        dataIndex: "status",
        type: "default",
        render: (a, b, record) => record.sex  === "1" ? "男" : "女",
      },
      {
        title: "联系方式",
        dataIndex: "phone",
      },
    ],
    actionColumns: [
      {
        title: "编辑",
        type: "edit",
        onClick: (a, b, record, ) => {
				  this.goEdit(record);
				},
      },
      {
        title: "删除",
        type: "del",
        url: "web/user/delete",
      },
    ],
  };

  /**
  * 打开新增模态框
  * @param item
  */
  goAdd = (item = {}) => {
    this.addModalRef.show(Object.assign({}, item, { isAdd: true, }));
  };

  /**
  * 打开编辑模态框
  * @param item
  */
  goEdit = (item = {}) => {
    this.editModalRef.show(Object.assign({}, item, { isAdd: false, }));
  };

  /**
  * 格式化详情接口返回内容
  * @param x
  */
  detailDataFormat = (x) => {
    // 在这里格式化
    return x;
  };

  /**
  * 格式化新增弹窗提交内容
  * @param x
  */
  submitAddFormat = (x) => {
    // 在这里格式化
    return x;
  };

  /**
  * 格式化编辑弹窗提交内容
  * @param x
  */
  submitEditFormat = (x) => {
    // 在这里格式化
    return x;
  };

  /**
  * 修改后更新列表
  */
  onSearch = () => {
    this.tableRef.onSearch();
  };

  render() {
    return (
      <div className="common-container">
        <CreateTable
          wrappedComponentRef={ref=>this.tableRef = ref}
          searchItems={this.TableConfig.searchItems}
          searchActionItems={this.TableConfig.searchActionItems}
          columns={this.TableConfig.columns}
          url={this.TableConfig.url}
          actionColumns={this.TableConfig.actionColumns}
        />
        <FormModal
          ref={ref=>this.addModalRef = ref}
          title={AddModalConfig.title}
          addSrc={AddModalConfig.url}
          filedItems={AddModalConfig.fieldItems}
          submitFormat={this.submitAddFormat}
          onOk={this.onSearch}
        />
        <FormModal
          ref={ref=>this.editModalRef = ref}
          title={EditModalConfig.title}
          editSrc={EditModalConfig.editUrl}
          detailData={EditModalConfig.detailUrl}
          filedItems={EditModalConfig.fieldItems}
          detailDataFormat={this.detailDataFormat}
          submitFormat={this.submitEditFormat}
          onOk={this.onSearch}
        />
      </div>
    );
  }
}
export default UserManager;
