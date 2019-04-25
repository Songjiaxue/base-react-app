import PropTypes from "prop-types";

/**
 * table组件校验
 * @type {{columns: shim, url: *, otherParams: shim, actionColumns: shim}}
 */
export const TableVerify = {
  columns: PropTypes.arrayOf( // 表头设置
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      type: PropTypes.oneOfType([ // 格式化数据
        PropTypes.string,
        PropTypes.func,
      ]),
      render:PropTypes.func,
    }),
  ).isRequired,
  url: PropTypes.string.isRequired, // 列表请求地址
  otherParams: PropTypes.object, // 其他参数 一般来源于顶部搜索条件
  actionColumns: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['del','edit','detail']),
      title: PropTypes.string,
      disable: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool,
      ]),
      onClick: PropTypes.func,
      url: PropTypes.string, // type = del 为删除地址, edit detail的时候为跳转地址
      render:PropTypes.func,
    }),
  ),  // 操作栏
};
/**
 * table顶部搜索校验
 * @type {{searchItems: shim, searchActionItems: shim}}
 */
export const TableSearchVerify = {
  searchItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['input', 'select','rangePicker','treeSelect','monthPicker','weekPicker','yearPicker','datePicker']),
      title: PropTypes.string.isRequired,
      selectOptions: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.instanceOf(Promise),
      ]),
      defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
      ]),
      otherParams: PropTypes.object,
    }),
  ).isRequired,
  searchActionItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['add','downloadTemplateFile', 'importFile', 'exportFile', ]),
      url: PropTypes.string,
      onClick: PropTypes.func,
      icon: PropTypes.node,
      otherParams: PropTypes.object,
    }),
  ),
};
