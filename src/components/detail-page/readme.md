# 使用范围
 详情页面

# API

| 属性        | 说明    |  类型  |  默认值  |
| --------   | -----:  | :----: | :----:  |
| detailUrl  | 详情接口地址  |   string    | '' |
| titleWidth  | title宽度 如果设置值，则title 右侧对齐，否则左侧对齐  |   string |''|
| info     | 网页渲染配置 |  array   | [] |
|detailFormat|格式化详情接口返回的数据|function| x => x |

# info结构
```javascript
  {
    title: "基础信息",
    splitNumber: 2, // 按照2列显示
    data: [
      {
        title: "姓名",
        name: "name",
      },
      {
        title: "年龄",
        name: "age",
        render: (value) => value.split("").join("-"),
      },
    ],
  }
  // format的值 Y M D H m s download image
  // Y 精确到年
  // M 精确到月
  // D 精确到天
  // H 精确到小时
  // m 精确到分钟
  // s 精确到秒
  // download
  // image 渲染图片列表

  有render函数优先使用render函数
```
[download类型值](../file-down-list/readme.md)

# usage

```javascript
  import DetailPage from "path-to-component";

  class Index  extends PureComponent {
    Info = [
      {
        title: "基础信息",
        splitNumber: 1,
        data: [
          {
            title: "姓名",
            name: "name",
          },
          {
            title: "年龄",
            name: "age",
          },
          {
            title: "性别",
            name: "sex",
          },
          {
            title: "头像",
            format: "image",
            name: "icon",
          },
          {
            title: "备注",
            name: "remark",
          },
        ],
      },
    ];
    render() {
      return (
        <div>
          <DetailPage
            detailUrl="web/user/details"
            detailFormat={this.detailFormat}
            info={this.Info}
          />
        </div>
      )
    }
  }
```
