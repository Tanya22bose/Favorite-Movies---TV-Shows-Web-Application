import { Button, Input, Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { LoginUser } from "../../api/user";

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        messageApi.success(response.message);
        localStorage.setItem("token", response?.data);
        navigate("/");
      } else messageApi.error(response.message);
    } catch (err) {
      console.error(err);
      messageApi.error(err.message);
    }
  };

  return (
    <div className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1 style={{ color: "purple" }}>Login to Favourite Shows</h1>
        </section>
        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              ></Input>
            </Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: 600 }}
            >
              Login
            </Button>
            <div className="mt-8">
              <p>
                New User? <Link to={"/register"}>Register Here</Link>
              </p>
            </div>
          </Form>
        </section>
      </main>
      {contextHolder}
    </div>
  );
};
