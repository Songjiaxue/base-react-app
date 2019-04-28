import React, {PureComponent,Fragment,} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import GenerateTable from "./generate-table";
import GenerateSearch from "./generate-search";
import { TableSearchVerify, TableVerify, } from './prop-types';

@withRouter
class CreateTablePage extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      params: Object.assign({}, props.otherParams),
    }
  }
  onSearch = (e) => {
    const {otherParams,formatSearchParams,} = this.props;
    const { params, } = this.state;
    this.setState({
      params: formatSearchParams(Object.assign({}, params, otherParams, e)),
    }, this.tableRef.searchData);
  };
  render() {
    const {searchItems,columns,url,actionColumns,searchActionItems,exportConfig,} = this.props;
    const { params, } = this.state;
    return (
      <Fragment>
        <GenerateSearch
          searchItems={searchItems}
          searchActionItems={searchActionItems}
          onSearch={this.onSearch}
        />
        <GenerateTable
          wrappedComponentRef={ref => this.tableRef = ref}
          url={url}
          columns={columns}
          actionColumns={actionColumns}
          otherParams={params}
          exportConfig={exportConfig}
        />
      </Fragment>
    );
  }
}
CreateTablePage.propTypes = {
  ...TableSearchVerify,
  ...TableVerify,
  formatSearchParams: PropTypes.func, // 格式化搜索条件
};
CreateTablePage.defaultProps = {
  otherParams: {},
  formatSearchParams: x => x,
};
export default CreateTablePage;
