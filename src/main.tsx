import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
//导入antd css
import "antd/dist/antd.min.css";
import "./index.scss";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <React.StrictMode>
      <Toaster />
      {/*配置语言为中文*/}
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </React.StrictMode>
  </div>
);
