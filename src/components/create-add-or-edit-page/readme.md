# 使用范围
  生成表单编辑和新增页面

# API

| 属性        | 说明       |  类型                 |  默认值  |
| --------   | -----:     | :----:               | :----:  |
| type       | 页面类型    |  emun("add", "edit") |add|
| submitUrl  | 数据提交地址 |   string             |'' |
| detailData | 详情数据对象或者地址(get) |  string，object |''|
|detailDataFormat| 获取详情后格式化方法| function | x => x|
|submitFormat| 提交数据前格式化数据方法| function | x => x |
|info| 页面内容| 网页渲染内容| 数组或者对象|{}|

# usage

```javascript
  import CreatAddPage from "path-to-component";

  class Index  extends PureComponent {
    info = [
      {
          title: "基础信息",
          formItemLayout: {
            labelCol: { span: 6, },
            wrapperCol: { span: 14, },
          },
          data: [
            {
              title: "姓名",
              name: "username",
              rule: {
                required: true,
                pattern: /^\w{2,5}$/,
              },
              extra: "备注信息",
            },
            {
              title: "年龄",
              name: "age",
              rule: {
                required: true,
                pattern: /^[1-9]\d?$/,
              },
            },
          ],
      }
    ];
    render() {
      return (
        <div>
          <CreatAddPage
            info={this.info}
          />
        </div>
      )
    }
  }
```
