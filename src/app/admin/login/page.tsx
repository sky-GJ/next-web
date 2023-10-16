"use client";
import { useRouter } from "next/navigation";
import { Card, Form, Button, Input } from "antd";
import styles from "./page.module.css";

function LoginPage() {
  const nav = useRouter();
  return (
    <>
      <div className={styles.Loginform}>
        <Card title="Next后台管理" className={styles.FormBox}>
          <Form
            labelCol={{ span: 3 }}
            onFinish={async (v) => {
              // console.log(v);
              const res = await fetch("/api/admin/login/", {
                method: "POST",
                body: JSON.stringify(v),
              }).then((res) => res.json());
              console.log(res);
              nav.push("/admin/dashboard");
            }}
          >
            <Form.Item name="userName" label="用户名">
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
