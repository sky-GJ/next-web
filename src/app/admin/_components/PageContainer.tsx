"use client";
import { Card } from "antd";
import React from "react";

function PageContainer({ children, title }: any) {
  return <Card title={title}>{children}</Card>;
}

export default PageContainer;
