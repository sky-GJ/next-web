"use client";
import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Table,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

type Article = {
  id: string;
  title: string;
  desc: string;
};

function ArticlePage() {
  const [open, setOpen] = useState(false); // 控制Model元素，用于显示和隐藏添加菜单
  const [list, setList] = useState<Article[]>([]); // 打印拉取到的数据(1)
  const [myForm] = Form.useForm(); // 获取Form组件，用于收集和提交form表单的信息

  const [query, setQuery] = useState({
    per: 10,
    page: 1,
    title: "",
  }); // 打印拉取到的数据(2)
  const [currentId, setCurrentId] = useState(""); // 现有数据的修改，通过操作唯一变量id对数据进行修改或删除等修改操作
  const [total, setTotal] = useState(0);

  // 查询数据
  useEffect(() => {
    fetch(
      `/api/admin/articles?page=${query.page}&per=${query.per}&title=${query.title}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
        setTotal(res.data.total);
        // console.log("data:", res.data.list);
        // console.log("total:", res.data.total);
      });
    console.log("query:", query);
  }, [query]);

  // 清空modal表单，每次使用完modal组件后重置其输入框
  useEffect(() => {
    if (!open) {
      setCurrentId("");
    }
  }, [open]);

  return (
    <Card
      title="文章管理"
      extra={
        <>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setOpen(true)}
          />
        </>
      }
    >
      <Form
        layout="inline"
        onFinish={(v) => {
          setQuery({
            page: 1,
            per: 10,
            title: v.title,
          });
        }}
      >
        <Form.Item label="标题" name="title">
          <Input placeholder="请输入关键词" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} htmlType="submit" type="primary" />
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: "8px" }}
        dataSource={list}
        rowKey="id"
        pagination={{
          total,
          onChange(page) {
            setQuery({
              ...query,
              per: 10,
              page,
            });
            // console.log(page);
          },
        }}
        columns={[
          {
            title: "序号",
            width: 80,
            render(v, r, i) {
              return i + 1;
            },
          },
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "简介",
            dataIndex: "desc",
          },
          {
            title: "操作",
            render(v, r) {
              return (
                <Space>
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                      setCurrentId(r.id);
                      myForm.setFieldsValue(r);
                    }}
                  />

                  <Popconfirm
                    title="是否确认删除？"
                    onConfirm={async () => {
                      await fetch("/api/admin/articles/" + r.id, {
                        method: "DELETE",
                      }).then((res) => res.json());
                      setQuery({ ...query, per: 10, page: 1 }); // 重置查询条件，重新获取数据
                    }}
                  >
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      type="primary"
                      danger
                    />
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      />
      <Modal
        title="编辑"
        open={open}
        onCancel={() => setOpen(false)}
        destroyOnClose={true} // 关闭窗口之后清空
        maskClosable={false} // 点击空白区域之后不关闭
        onOk={() => {
          myForm.submit();
        }}
      >
        <Form
          layout="vertical"
          form={myForm}
          preserve={false} // 和Modal结合使用时需要设置该值，否则无法触发清空事件
          onFinish={async (v) => {
            // console.log(v);

            if (currentId) {
              // 修改
              await fetch("/api/admin/articles/" + currentId, {
                body: JSON.stringify(v),
                method: "PUT",
              }).then((res) => res.json());
            } else {
              await fetch("/api/admin/articles/", {
                method: "POST",
                body: JSON.stringify(v),
              }).then((res) => res.json());
            }

            setOpen(false); // 发送完后关闭modal窗口
            setQuery({ ...query }); // 发送form表单结束后更新数据
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "标题不能为空！" }]}
          >
            <Input placeholder="请输入名字" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input placeholder="请输入..." />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default ArticlePage;
