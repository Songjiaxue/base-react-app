# 使用范围
  附件列表展示，带下载功能

# API

| 属性        | 说明    |  类型  |  默认值  |
| --------   | -----:  | :----: | :----:  |
| fileList     | 文件列表 |  Array[{fileName:'',fileUrl:'',id:''}]   |[]|



# usage

```javascript
  import FileDownList from "path-to-component";

  class Index  extends PureComponent {
    render() {
      return (
        <div>
          <FileDownList
            fileList={[
              fileName: '文件名',
              fileUrl: 'path/to/file',
              id: 1,
            ]}
          />
        </div>
      )
    }
  }
```
