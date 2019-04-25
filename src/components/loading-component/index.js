import React from 'react';
import { Spin } from 'antd';
import './index.less';
export default ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return (
      <div
        className="loading-wrap"
      >
        <Spin size="large" />
      </div>
    );
  }
  // Handle the error state
  else if (error) {
    return <div className="loading-wrap">Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
