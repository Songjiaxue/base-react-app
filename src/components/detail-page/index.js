import React, {PureComponent,Fragment,} from "react";
import {Row,Col,message,Spin,} from "antd";
import {withRouter,} from 'react-router-dom';
import PropTypes from "prop-types";
import _ from "lodash";
import Subtitle from "@components/subtitle";
import FileDownList from "@components/file-down-list";
import { 
  formatTimeVal, formatValue, InitImageViwer, isString,
  isObject,isReactComponent,isArray,
 } from "@util/helpers";

@withRouter
class DetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      detailData: {},
      showLoading: isString(props.detailInfo),
      error: "",
    }
  }
  render() {
    const { showLoading,error,} = this.state;
    const { info, } = this.props;
    if (showLoading) {
      return <Spin />;
    }
    if (error) {
      return <div>{error}</div>
    }
    return (
      <div className="common-detail">
        {
          this.renderDetail(info)
        }
      </div>
    );
  }
  componentDidMount() {
    const {detailUrl,} = this.props;
    if (detailUrl) { // 有详情地址，则需要获取详细内容
      this.getDetailInfo();
    } else {
      InitImageViwer();
    }
  }
  getDetailInfo = async () => {
    const {detailUrl,detailFormat,match,} = this.props;
    const id = _.get(match,'params.id', '');
    let url = detailUrl;
    if (!detailUrl.match(/(\/\d+)$/)) {
      url = `${detailUrl}/${id}`;
    }
    const {code,data,message:Msg,} = await window.Get(url);
    if (code) {
      this.setState({
        error: Msg,
        showLoading: false,
      });
      message.error(Msg);
    } else {
      const detailData = detailFormat(data);
      this.setState({
        detailData,
        showLoading: false,
      });
      InitImageViwer();
    }
  };

  renderDetail(items,) {
    return items.map(z => {
      let Children = "";
      const span = 24 / z.splitNumber;
      if (isArray(z.data)) {
        Children = () => (
          <Row
            className="detail-item"
            gutter={24}
          >
            {
              z.data.map(m => this.generateItem(m, span))
            }
          </Row>
        );
      } else if (isReactComponent(z.data)) {
        Children = z.data;
      } else {
        Children = z.data.toString();
      }
      return (
        <Fragment key={z.title}>
          <Subtitle
            title={z.title}
            extra={z.extra}
          />
          <div className="detail-items-box">
            <Children />
          </div>
        </Fragment>
      );
    });
  }
  generateItem(item,span) {
    const {titleWidth,splitNumber,} = this.props;
    let titleCss = {
      "width": "auto",
      "minWidth": "auto",
      "textAlign": "left",
    };
    if (titleWidth) {
      titleCss.width = titleWidth;
      titleCss["minWidth"] = titleWidth;
      titleCss["textAlign"] = splitNumber > 1 ? "right" : "left";
    }
    return (
      <Col
        span={span}
        key={item.title}
      >
        <span
          style={titleCss}
          className="detail-item-title"
        >
          {item.title}：
        </span>
        <div className="detail-item-content">
          {
            this.formatValue(item)
          }
        </div>
      </Col>
    );
  }

  /**
   * 获取显示的值 有value直接使用value，没有尝试在接口返回里面查找，没有再尝试使用默认值
   * @param item
   * @returns {*}
   */
  getItemValue = (item) => {
    const { detailData, } = this.state;
    if (item.hasOwnProperty("value")) {
      return item.value;
    }
    if (detailData.hasOwnProperty(item.name)) {
      return detailData[item.name];
    }
    if (item.hasOwnProperty("defaultValue")) {
      return item.defaultValue;
    }
    return undefined;
  };

  formatValue(item) {
    const value = this.getItemValue(item);
    if (item.render) {
      return item.render(value);
    }
    let data = "";
    switch (item.format) {
      case "s":
        data = formatTimeVal(value, "YYYY-MM-DD HH:mm:ss");
        break;
      case "m":
        data = formatTimeVal(value, "YYYY-MM-DD HH:mm");
        break;
      case "H":
        data = formatTimeVal(value, "YYYY-MM-DD HH");
        break;
      case "D":
        data = formatTimeVal(value, "YYYY-MM-DD");
        break;
      case "M":
        data = formatTimeVal(value, "YYYY-MM");
        break;
      case "Y":
        data = formatTimeVal(value, "YYYY");
        break;
      case "download":
        if (isArray(value)) {
          data = <FileDownList fileList={value} />;
        } else if (isObject(value)){
          data = <FileDownList fileList={[value,]} />;
        } else {
          data = formatValue(value);
        }
        break;
      case "image":
        data = (
          <div className="common-img-list">
            {DetailPage.generateImages(value)}
          </div>
        );
        break;
      default:
        data = formatValue(value);
    }
    return data;
  }

  static generateImages(data) {
    if (isArray(data)) {
      const first = data[0];
      if (first && isObject(first)) {
        return data.map((z,i) => (
          <img
            key={i}
            src={z.fileUrl}
            alt=""
          />
        ));
      } else {
        return data.map((z,i) => {
          return (
            <img
              src={z}
              key={i}
              alt=""
            />
          );
        });
      }
    } else if (isObject(data)){
      return <img src={data.fileUrl} alt="" />;
    } else {
      return <img src={data} alt="" />;
    }
  }
}
DetailPage.propTypes = {
  detailUrl: PropTypes.string,
  titleWidth: PropTypes.string,// title宽度 如果设置值，则title 右侧对齐，否则左侧对齐
  info: PropTypes.array.isRequired, // 渲染配置
  detailFormat: PropTypes.func, // 格式化获取到的详情数据
};

DetailPage.defaultProps = {
  detailUrl: '',
  titleWidth: "",
  info: [],
  detailFormat: x => x,
};
export default DetailPage;
