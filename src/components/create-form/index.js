import React, {PureComponent,} from "react";
import {Form, Input, Select, Switch,DatePicker,TreeSelect, } from "antd";
import Ajv from 'ajv';
import PropTypes from "prop-types";
import UploadImg from "@components/upload/index";
import UploadFiles from "@components/upload/upload-file";
import YearPicker from "@components/year-picker/index";
import {isArray,isString,isObject,isNumber, isFunction,} from "@util/helpers";
import AjvFormat from "./ajv-format";


const FormInputKeys = {};

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      requestDataMap: {},
      detailInfo: {},// 详情数据
      loading: false, // 是否正在提交表单
    }
  }
  render() {
    const {filedItems,formItemLayout,} = this.props;
    const layout = formItemLayout ? "horizontal" : "vertical";
    const defaultFormItemLayout = formItemLayout;
    return (
      <Form
        layout={layout}
      >
        {
          filedItems.map(j => this.generateItem(j,defaultFormItemLayout))
        }
      </Form>
    );
  }

  /**
   * 构建表单项
   * @param data
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateItem(data,defaultFormItemLayout) {
    FormInputKeys[data.name] = data;
    const rulesAndPlaceholder = this.createRulesAndPlaceholder(data);
    if (data.component) {
      return this.generateCustomInput(data,rulesAndPlaceholder,defaultFormItemLayout);
    }
    switch (data.type) {
      case "select":
        return this.generateSelect(data,rulesAndPlaceholder,defaultFormItemLayout);
      case "treeSelect":
        return this.generateTreeSelect(data,rulesAndPlaceholder,defaultFormItemLayout);
      case "uploadImg":
        return this.generateUploadImg(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "switch":
        return this.generateSwitch(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "uploadFile":
        return this.generateUploadFile(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "datePicker":
        return this.generateDatePicker(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "monthPicker":
        return this.generateMonthPicker(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "weekPicker":
        return this.generateWeekPicker(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "yearPicker":
        return this.generateYearPicker(data, rulesAndPlaceholder,defaultFormItemLayout);
      case "rangePicker":
        return this.generateRangePicker(data, rulesAndPlaceholder,defaultFormItemLayout);
      default:
        return this.generateInput(data,rulesAndPlaceholder,defaultFormItemLayout);
    }
  }

  /**
   * 生成自定义组件类型表单
   * @param data
   * @param rules
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateCustomInput = (data,{rules,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    const Component = data.component;
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <Component {...other}/>
        )}
      </Form.Item>
    );
  }
  /**
   * 时间范围选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateRangePicker = (data,{rules,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <DatePicker.RangePicker
            {...other}
          />
        )}
      </Form.Item>
    );
  };
  /**
   * 生成年选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateYearPicker = (data,{rules,placeholder},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <YearPicker
            otherParams = {other}
            placeholder={placeholder}
          />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成周选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateWeekPicker = (data,{rules,placeholder},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <DatePicker.WeekPicker
            placeholder={placeholder}
            {...other}
          />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成月份选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateMonthPicker = (data,{rules,placeholder},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <DatePicker.MonthPicker
            placeholder={placeholder}
            {...other}
          />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成日期选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateDatePicker = (data,{rules,placeholder},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <DatePicker
            placeholder={placeholder}
            {...other}
          />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成上传文件
   * @param data
   * @param rules
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateUploadFile = (data,{rules,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <UploadFiles
            otherParams = {other}
          />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成开关
   * @param data
   * @param rules
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateSwitch = (data,{rules,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          valuePropName: 'checked',
          rules,
        })(
          <Switch {...other} />
        )}
      </Form.Item>
    );
  };
  /**
   * 生成图片上传
   * @param data
   * @param rules
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateUploadImg = (data,{rules,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <UploadImg otherParams={other} />
        )}
      </Form.Item>
    );
  }
  /**
   * 生成treeSelect子节点
   * @param items
   * @returns {*}
   */
  generateTreeNode = (items) => {
    return items.map(z => {
      return (
        <TreeSelect.TreeNode
          value = {`${z.value}`}
          title = {z.label}
          key = {z.value}
        >
          {
            this.generateTreeNode(z.children || [])
          }
        </TreeSelect.TreeNode>
      );
    })
  }
  /**
   * 生成树形选择器
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateTreeSelect  = (data,{rules,placeholder,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const {requestDataMap,} = this.state;
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
    const isPass = ajv.validate(AjvFormat.treeSelect,SelectOptions);
    if (!isPass) {
      console.error(`${data.name} selectOptions error:`,ajv.errors);
    }
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <TreeSelect
            treeDefaultExpandAll
            {...other}
            placeholder={placeholder}
          >
            {
              this.generateTreeNode(SelectOptions)
            }
          </TreeSelect>
        )}
      </Form.Item>
    );
  };
  /**
   * 构建select类型输入框
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateSelect = (data,{rules,placeholder,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const {requestDataMap,} = this.state;
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
      const options = requestDataMap[data.name] || [];
      SelectOptions = isFunction(data.formatOptions) ? data.formatOptions(options) : options;
    }
    const ajv = new Ajv();
    const isPass = ajv.validate(AjvFormat.tree,SelectOptions);
    if (!isPass) {
      console.error(`${data.name} selectOptions error:`,ajv.errors);
    }
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <Select
            {...other}
            placeholder={placeholder}
          >
            {
              SelectOptions.map(z => {
                if (isObject(z)) {
                  return (
                    <Select.Option
                      key={`${z.value}`}
                      value={`${z.value}`}
                    >
                      {z.label}
                    </Select.Option>
                  );
                } else {
                  return (
                    <Select.Option
                      key={z}
                      value={z}
                    >
                      {z}
                    </Select.Option>
                  );
                }
              })
            }
          </Select>
        )}
      </Form.Item>
    );
  };
  /**
   * 构建input类型输入框
   * @param data
   * @param rules
   * @param placeholder
   * @param defaultFormItemLayout
   * @returns {*}
   */
  generateInput = (data,{rules,placeholder,},defaultFormItemLayout) => {
    const { form: {getFieldDecorator,}, } = this.props;
    const other = data.otherParams || {};
    return (
      <Form.Item
        key={data.name}
        label={data.title}
        extra={data.extra}
        {...defaultFormItemLayout}
      >
        {getFieldDecorator(data.name, {
          rules,
        })(
          <Input
            {...other}
            placeholder={placeholder}
          />
        )}
      </Form.Item>
    );
  };
  /**
   * 构建表单规则和Placeholder
   * @param data
   * @returns {{rules: Array, placeholder: (*|string)}}
   */
  createRulesAndPlaceholder(data) {
    const prefix = /(select|switch|treeSelect|uploadImg|uploadFile|[a-z]*Picker)/i.test(data.type) ? "请选择" : "请输入";
    let placeholder = "";
    if (data.placeholder) {
      placeholder = data.placeholder;
    } else {
      placeholder = prefix + data.title;
    }
    const rules = [];
    if (prefix === "请输入") {
      rules.push({
        pattern: /^(?!(\s+$))/,
        message: "不能全部为空格",
      });
    }
    if (data.rule) {
      if (data.rule.required) {
        rules.push({
          required: true,
          message: prefix + data.title,
        });
      }
      if (data.rule.pattern) {
        if (isObject(data.rule.pattern) && data.rule.pattern.message && data.rule.pattern.reg) {
          rules.push({
            pattern: data.rule.pattern.reg,
            message: data.rule.pattern.message,
          });
        } else {
          rules.push({
            pattern: data.rule.pattern,
            message: `${prefix}正确的${data.title}`,
          });
        }
      }
      if (data.rule.validator) {
        rules.push(data.rule.validator.bind(this))
      }
    }
    return {
      rules,
      placeholder,
    };
  }

  componentDidMount() {
    const {type,} = this.props;
    this.getRequestData();
    if (type === 'edit') {
      this.requestDetailInfo();
    }
  }

  getDetailInfo = () => {
    const { detailInfo, } = this.state;
    return detailInfo;
  };

  requestDetailInfo = async () => {
    const { detailData, detailDataFormat, } = this.props;
    if (isString(detailData)) {
      const {data,code,} = await window.Get(detailData);
      if (code === 0) {
        this.setState({
          detailInfo: detailDataFormat(data),
        }, this.initFormValue)
      }
    } else {
      this.setState({
        detailInfo: detailDataFormat(detailData),
      }, this.initFormValue)
    }
  };
  initFormValue = () => {
    const {detailInfo,} = this.state;
    const {form,} = this.props;
    const keys = Object.keys(FormInputKeys);
    const formValue = {};
    keys.forEach(z => {
      formValue[z] = isNumber(detailInfo[z]) ? `${detailInfo[z]}` : detailInfo[z] || undefined;
    });
    form.setFieldsValue(formValue);
  };
  /**
   * 找到需要发请求的对象
   * @param items
   */
  getRequestItem(items) {
    const newRequestDataMap = {};
    if (!isArray(items)) {
      return newRequestDataMap;
    }
    items.forEach(item => {
      if (isArray(item)) {
        item.forEach(z => {
          if (isObject(z) && z.selectOptions && (z.selectOptions instanceof Promise)) {
            newRequestDataMap[z.name] = []
          }
        })
      }
      if (isObject(item) && item.selectOptions && (item.selectOptions instanceof Promise)) {
        newRequestDataMap[item.name] = []
      }
    });
    return newRequestDataMap;
  }

  /**
   * 获取需要请求对象的数据
   * @returns {Promise<void>}
   */
  getRequestData = async () => {
    let newRequestDataMap = {};
    const {filedItems,} = this.props;
    newRequestDataMap = Object.assign({}, newRequestDataMap, this.getRequestItem(filedItems));
    const requestList = [];
    const keys = Object.keys(newRequestDataMap);
    keys.forEach(z => {
      requestList.push(newRequestDataMap[z])
    });
    Promise.all(requestList).then(z => {
      z.forEach((j,index) => {
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
CreateForm.propTypes = {
  type: PropTypes.oneOf(['edit','add']),
  filedItems: PropTypes.arrayOf( // 生成表单数据
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  formItemLayout: PropTypes.object, // 布局方式
  detailData: PropTypes.oneOfType([ // 获取详情地址或者详情数据
    PropTypes.string,
    PropTypes.object,
  ]),
  submitFormat: PropTypes.func, // 提交的时候格式化数据
  detailDataFormat: PropTypes.func,// 获取详情后格式化数据
};
CreateForm.defaultProps = {
  submitFormat: x => x,
  filedItems: [],
  type: "add",
  detailDataFormat: x => x,
};
export default CreateForm;
