// 1. 判断token是否存在
// 2. 如果存在 直接正常渲染
// 3. 如果不存在 重定向到登录路由

// 高阶组件：把一个组件当成另外一个组件的参数传入
// 然后通过一定的判断返回新的组件

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";
import {message} from "antd";

function AuthComponent({ children }: any) {
  let isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    message.error("请先登录");
    return <Navigate to="/login" replace />;
  }
}

export { AuthComponent };
