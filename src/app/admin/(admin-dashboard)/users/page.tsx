"use client";
import React from "react";
import { Form, Input, Button, Table, Card } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PageContainer from "../../_components/PageContainer";

function UsersPage() {
  return (
    <Card
      title="用户信息"
      extra={
        <>
          <Button icon={<PlusOutlined />} type="primary" />
        </>
      }
    >
      <Form layout="inline">
        <Form.Item label="名字">
          <Input placeholder="请输入名字" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" />
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: "8px" }}
        columns={[
          {
            title: "序号",
          },
          {
            title: "名字",
          },
          {
            title: "昵称",
          },
          {
            title: "用户名",
          },
        ]}
      />
    </Card>
  );
}

export default UsersPage;
