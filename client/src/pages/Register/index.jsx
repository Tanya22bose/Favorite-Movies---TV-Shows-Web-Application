import { Button, Input, Form, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/user";

export const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        messageApi.success(response.message);
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
        <section className="left-section py-4">
          <h1 style={{ color: "blueviolet" }}>Register</h1>
        </section>
        <section className="right-section">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
              ></Input>
            </Form.Item>
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
              Register
            </Button>
            <div className="mt-8">
              <p>
                Existing User? <Link to={"/login"}>Login Here</Link>
              </p>
            </div>
          </Form>
        </section>
      </main>
      {contextHolder}
    </div>
  );
};
