"use client";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

function AntdContainer({ children }: any) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}

export default AntdContainer;
