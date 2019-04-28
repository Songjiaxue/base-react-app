/**
 * Author: ry
 * Date: 2018/10/13 09:50
 * Desc: 二级标题
 */
import React from "react";

export default ({title, extra, }) => {
  return (
    <div className="common-subtitle">
      <span>{title}</span>
      {
        extra && <div className="extra">{extra}</div>
      }
    </div>
  );
}
