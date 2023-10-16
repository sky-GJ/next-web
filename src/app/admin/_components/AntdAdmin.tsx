"use client";
import { useState } from "react";
import {
  HomeOutlined,
  DashboardOutlined,
  BookOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useRouter } from "next/navigation";
import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function AntdAdmin({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const nav = useRouter();

  // 侧边导航栏
  const items1: MenuProps["items"] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "看板",
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: "账号管理",
    },
    {
      key: "articles",
      icon: <BookOutlined />,
      label: "文章管理",
    },
  ];

  // 顶部导航栏
  const items2: MenuProps["items"] = [
    {
      label: "首页",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <a
          href="https://github.com/sky-GJ/next-antd-ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      ),
      key: "alipay",
    },
    {
      label: "个人中心",
      key: "Person",
      icon: <UserOutlined />,
      children: [
        {
          label: "退出",
          key: "Out",
        },
      ],
    },
  ];

  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key); // 侧边栏缩放
    console.log("click ", e);
    switch (e.key) {
      case "dashboard":
        nav.push("/admin/dashboard");
        break;
      case "users":
        nav.push("/admin/users");
        break;
      case "articles":
        nav.push("/admin/articles");
        break;
    }
  };

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          {/* 侧边导航栏 */}
          <div
            className="demo-logo-vertical"
            style={{
              height: "32px",
              margin: "16px 0",
              color: "white",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {collapsed ? "Next" : "Next管理后台"}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            // defaultSelectedKeys={["1"]}
            onClick={onClick}
            items={items1}
          />
        </Sider>

        {/* 顶部导航栏 */}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="horizontal"
              items={items2}
              style={{ marginRight: "15px" }}
            />
          </Header>

          {/* 子页面 */}
          <Content
            style={{
              margin: "12px",
              padding: "8px",
              minHeight: 280,
              background: colorBgContainer,
              overflow: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AntdAdmin;
