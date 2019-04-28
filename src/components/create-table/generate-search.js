import React, { PureComponent, Fragment, } from "react";
import PropTypes from "prop-types";
import { Select, TreeSelect, DatePicker, Input, Button, Upload, message, } from "antd";
import Ajv from "ajv";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import { isArray, isNumber, } from "@util/helpers";
import { SystemConfig, } from '@util';
import Icon from '@components/icon';
import YearPicker from "@components/year-picker/index";
import AjvFormat from "../create-form/ajv-format";
import { TableSearchVerify, } from './prop-types';

import PermissionContext from '../base-page/permission-context';

const { PermissionControl } = SystemConfig;

const InputSetting = {
  style: {
    width: "2rem"
  }
};

const SelectSetting = {
  ...InputSetting,
  placeholder: "全部",
  allowClear: true,
  showSearch: true
}

const TreeSelectSetting = {
  ...InputSetting,
  placeholder: "全部",
  allowClear: true,
};

const DatePickerRangeSetting = {
  style: {
    width: '3.6rem'
  }
};
const DatePickerSetting = {
  style: {
    width: '2rem'
  }
};

@withRouter
class GenerateTable extends PureComponent {
  constructor(props) {
    super(props);
    const oldParams = GenerateTable.getParams(props.searchItems);
    const { showItems, hiddenItems, } = GenerateTable.getFormatItems(props.searchItems);
    this.state = {
      requestDataMap: {},
      params: oldParams,
      oldParams,
      showItems,
      hiddenItems,
      showHidden: false,
    };
  }

  static contextType = PermissionContext;

  static getParams(searchItems) {
    const params = {};
    for (let x in searchItems) {
      params[searchItems[x].name] = isNumber(searchItems[x].defaultValue) ? `${searchItems[x].defaultValue}` : (searchItems[x].defaultValue || undefined);
    }
    return params;
  }
  static getFormatItems(searchItems = []) {
    const showItems = searchItems.filter(z => z.show !== false);
    const hiddenItems = searchItems.filter(z => z.show === false);
    return {
      showItems,
      hiddenItems,
    };
  }
  render() {
    const actions = this.context;
    const { showItems, hiddenItems, showHidden, } = this.state;
    const filterFunc = col => {
      if(!PermissionControl){
        return true;
      }
      return !col.permission || actions.find(action => action.value === col.permission)
    };
    const authedShowItems = showItems.filter(filterFunc);
    const authedHiddenItems = hiddenItems.filter(filterFunc);
    const searchShowFormItemsEle = this.generateItems(authedShowItems);
    const searchHideFormItemsEle = showHidden ? this.generateItems(authedHiddenItems) : null;
    const actionBtnsEle = this.generateActionItems();
    if (!searchShowFormItemsEle && !searchHideFormItemsEle && !actionBtnsEle) {
      return null;
    }

    return (
      <div className="common-search-box">
        {
          (authedShowItems.length > 0 || authedHiddenItems.length > 0) && (
            <div className="search-inputs">
              {searchShowFormItemsEle}
              {searchHideFormItemsEle}
              {
                this.generateAction()
              }
            </div>
          )
        }

        {actionBtnsEle}
      </div>
    );
  }

  generateItems = (searchItems) => {
    if (!Array.isArray(searchItems) || 0 === searchItems.length) {
      return null;
    }
    return searchItems.map(z => {
      switch (z.type) {
        case "select":
          return this.generateSelect(z);
        case "treeSelect":
          return this.generateTreeSelect(z);
        case "rangePicker":
          return this.generateRangePicker(z);
        case "monthPicker":
          return this.generateMonthPicker(z);
        case "yearPicker":
          return this.generateYearPicker(z);
        case "datePicker":
          return this.generateDatePicker(z);
        case "weekPicker":
          return this.generateWeekPicker(z);
        default:
          return this.generateInput(z);
      }
    });
  };
  toggleHiddenItems = () => {
    const { showHidden, } = this.state;
    this.setState({
      showHidden: !showHidden,
    });
  };
  /**
   * 生成筛选和重置
   * @returns {*}
   */
  generateAction = () => {
    const { hiddenItems, showHidden, } = this.state;
    return (
      <Fragment>
        {
          !!hiddenItems.length && (
            <div
              className="item-btn spread"
              key="spread"
            >
              <span className="icon icon-JL_dian" onClick={this.toggleHiddenItems}>
                {showHidden ? '收起' : '更多'}
              </span>
            </div>
          )
        }
        <div
          className="item-btn"
          key="filter"
        >
          <Button className="btnHollow" onClick={this.search}>
            筛选
          </Button>
        </div>
        <div className="item-btn" key="reset">
          <Button
            onClick={this.resetParams}
          >
            重置
          </Button>
        </div>
      </Fragment>
    );
  };
  search = () => {
    const { onSearch, } = this.props;
    const { params, } = this.state;
    onSearch && onSearch(params);
  };
  resetParams = () => {
    const { oldParams, } = this.state;
    this.setState({
      params: Object.assign({}, oldParams),
    }, this.search);
  };
  changeValue = (val, item) => {
    const { params, } = this.state;
    this.setState({
      params: Object.assign({}, params, { [item.name]: val, }),
    });
  };
  /**
   * 生成操作按钮
   * @returns {*}
   */
  generateActionItems = () => {
    const actions = this.context;
    const { searchActionItems, } = this.props;
    const filteredActionItems = searchActionItems.filter(
      col => {
        if(!PermissionControl){
          return true;
        }
        return !col.permission || actions.find(action => action.value === col.permission)
      }
    );
    if (!filteredActionItems.length) {
      return null;
    }
    return (
      <div>
        {
          filteredActionItems.map(z => {
            let icon = z.icon || null;
            const other = z.otherParams || {
              type: "primary"
            };
            if (z.type === "add") {
              icon = z.icon || <Icon type="icon-JL_plus" />;
            }
            if (z.type === "downloadTemplateFile") {
              icon = z.icon || <Icon type="icon-JL_xiazai" />;
            }
            if (z.type === "exportFile") {
              icon = z.icon || <Icon type="icon-JL_xiazai" />;
            }
            if (z.type === "importFile") {
              icon = z.icon || <Icon type="icon-JL_daoru" />;
              return (
                <div
                  key={z.title}
                  className="item-btn"
                >
                  <Upload
                    action={z.url}
                    accept=".xls,.xlsx"
                    showUploadList={false}
                    onChange={this.uploadFileChange}
                    headers={{
                      "token": Cookies.get("SystemToken"),
                    }}
                  >
                    <Button
                      {...other}
                    >
                      {icon}
                      {z.title}
                    </Button>
                  </Upload>
                </div>
              );
            }
            return (
              <div
                key={z.title}
                className="item-btn"
              >
                <Button
                  {...other}
                  onClick={() => this.btnClick(z)}
                >
                  {icon}
                  {z.title}
                </Button>
              </div>
            );
          })
        }
      </div>
    );
  };
  uploadFileChange = ({ file }) => {
    if (file && file.response) {
      if (file.response.code === 0) {
        message.success("上传成功", this.search);
      } else {
        message.error("上传失败");
      }
    }
  };
  /**
   * 按钮点击
   * @param type
   * @param onClick
   * @param url
   * @param name
   */
  btnClick = ({ type, onClick, url, title, }) => {
    const { params, } = this.state;
    const { history, } = this.props;
    if (type === "add" && url) {
      history.push({
        pathname: url,
      });
      return;
    }
    if (type === "downloadTemplateFile" && url) {
      const a = document.createElement("a");
      a.setAttribute("href", url);
      a.click();
      return;
    }
    if (type === "exportFile" && url) {
      window.Post(url, params).then(({ code, message: msg, data, }) => {
        if(!code){
          const a = document.createElement("a");
          a.setAttribute("href", data);
          a.click();
          return;
        } else {
          message.error(msg);
        }
      });
    }
    onClick && onClick(title);
  };
  componentDidMount() {
    this.getRequestData();
  }

  /**
   * 生成输入框
   * @param data
   * @returns {*}
   */
  generateInput = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    const placeholder = data.placeholder || `请输入${data.title}`;
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <Input
          value={params[data.name]}
          {...InputSetting}
          placeholder={placeholder}
          {...other}
          onChange={(e) => this.changeValue(e.target.value, data)}
        />
      </div>
    );
  }
  /**
   * 生成日期选择框
   * @param data
   * @returns {*}
   */
  generateDatePicker = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <DatePicker
          value={params[data.name]}
          {...DatePickerSetting}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        />
      </div>
    );
  }
  /**
   * 生成周输入框
   * @param data
   * @returns {*}
   */
  generateWeekPicker = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <DatePicker.WeekPicker
          value={params[data.name]}
          {...DatePickerSetting}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        />
      </div>
    );
  }
  /**
   * 生成年输入框
   * @param data
   * @returns {*}
   */
  generateYearPicker = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <YearPicker
          placeholder={`请选择${data.title}`}
          value={params[data.name]}
          {...DatePickerSetting}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        />
      </div>
    );
  }
  /**
   * 生成月份输入框
   * @param data
   * @returns {*}
   */
  generateMonthPicker = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <DatePicker.MonthPicker
          value={params[data.name]}
          {...DatePickerSetting}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        />
      </div>
    );
  };
  generateRangePicker = (data) => {
    const { params, } = this.state;
    const other = data.otherParams || {};
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <DatePicker.RangePicker
          value={params[data.name]}
          {...DatePickerRangeSetting}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        />
      </div>
    );
  };
  /**
   * 生成treeSelect 类型输入框
   * @param data
   * @returns {*}
   */
  generateTreeSelect = (data) => {
    const { requestDataMap, params, } = this.state;
    if (!data.selectOptions) {
      throw new Error("选择类型的输入框，必须提供\"selectOptions\"参数,类型是数组或者Promise:\n" +
        "最终得到的结构是: \n" +
        "\t[\n" +
        "\t\t{\n" +
        "\t\t\tlabel:\"name1\",\n" +
        "\t\t\tvalue: \"value\"\n" +
        "\t\t\tchildren:[]\n" +
        "\t\t},\n" +
        "\t\t{\n" +
        "\t\t\tlabel:\"name1\",\n" +
        "\t\t\tvalue: \"value\"\n" +
        "\t\t\tchildren:[]\n" +
        "\t\t}\n" +
        "\t]");
    }
    let SelectOptions = [];
    if (isArray(data.selectOptions)) {
      SelectOptions = data.selectOptions;
    } else {
      SelectOptions = requestDataMap[data.name] || [];
    }
    const ajv = new Ajv();
    const isPass = ajv.validate(AjvFormat.treeSelect, SelectOptions);
    if (!isPass) {
      console.error(`${data.name} selectOptions error:`, ajv.errors);
    }
    const other = data.otherParams || { treeDefaultExpandAll: true };
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <TreeSelect
          value={params[data.name]}
          {...TreeSelectSetting}
          placeholder={`请选择${data.title}`}
          {...other}
          onChange={(e) => this.changeValue(e, data)}
        >
          {
            this.generateTreeNode(SelectOptions)
          }
        </TreeSelect>
      </div>
    );
  };
  /**
   * 生成treeSelect子节点
   * @param searchItems
   * @returns {*}
   */
  generateTreeNode = (searchItems) => {
    return searchItems.map(z => {
      return (
        <TreeSelect.TreeNode
          value={`${z.value}`}
          title={z.label}
          key={z.label}
        >
          {
            this.generateTreeNode(z.children || [])
          }
        </TreeSelect.TreeNode>
      );
    })
  }
  /**
   * 生成select类型输入框
   * @param data
   * @returns {*}
   */
  generateSelect = (data) => {
    const { requestDataMap, params, } = this.state;
    if (!data.selectOptions) {
      throw new Error("选择类型的输入框，必须提供\"selectOptions\"参数,类型是数组或者Promise:\n" +
        "最终得到的结构是: \n" +
        "\t[\n" +
        "\t\t{\n" +
        "\t\t\tlabel:\"name1\",\n" +
        "\t\t\tvalue: \"value\"\n" +
        "\t\t\tchildren:[]\n" +
        "\t\t},\n" +
        "\t\t{\n" +
        "\t\t\tlabel:\"name1\",\n" +
        "\t\t\tvalue: \"value\"\n" +
        "\t\t\tchildren:[]\n" +
        "\t\t}\n" +
        "\t]");
    }
    let SelectOptions = [];
    if (isArray(data.selectOptions)) {
      SelectOptions = data.selectOptions;
    } else {
      SelectOptions = requestDataMap[data.name] || [];
    }
    const other = data.otherParams || { treeDefaultExpandAll: true };
    return (
      <div
        className="item-input"
        key={data.name}
      >
        <span className="label">{data.title}</span>
        <Select
          key={data.name}
          value={params[data.name]}
          onChange={(e) => this.changeValue(e, data)}
          placeholder={`请选择${data.title}`}
          {...SelectSetting}
          {...other}
        >
          {
            SelectOptions.map(z => {
              return (
                <Select.Option
                  key={`${z.value}`}
                  value={`${z.value}`}
                >
                  {z.label}
                </Select.Option>
              );
            })
          }
        </Select>
      </div>
    );
  }
  /**
   * 获取需要请求对象的数据
   * @returns {Promise<void>}
   */
  getRequestData = () => {
    let newRequestDataMap = {};
    const { searchItems, } = this.props;
    const needFetchType = ['select', 'treeSelect',];
    searchItems.filter(z => needFetchType.includes(z.type) && (z.selectOptions instanceof Promise))
      .forEach(z => {
        newRequestDataMap[z.name] = z.selectOptions;
      });
    const requestList = [];
    const keys = Object.keys(newRequestDataMap);
    keys.forEach(z => {
      requestList.push(newRequestDataMap[z])
    });
    Promise.all(requestList).then(z => {
      z.forEach((j, index) => {
        newRequestDataMap[keys[index]] = j;
      });
      return newRequestDataMap;
    }).then(m => {
      this.setState({
        requestDataMap: m,
      });
    })
  };
}
GenerateTable.propTypes = {
  ...TableSearchVerify,
  onSearch: PropTypes.func,
};
GenerateTable.defaultProps = {
  searchActionItems: [],
  searchItems: [],
}
export default GenerateTable;
