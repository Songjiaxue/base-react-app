import {Icon,} from "antd";
import { SystemConfig, MY_ICON_URL} from "@util";

export default Icon.createFromIconfontCN({
  scriptUrl: process.env.NODE_ENV === "production" ? MY_ICON_URL : SystemConfig.IconScriptUrl,
});
