import { Button, Form, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "../styles/style.css";
import TextField from "../components/TextField";
import { useNavigate } from "react-router-dom";
import axiosDefault from "../configs/axiosConfig";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { AuthHandler } from "../handlers/AuthHandler";
import { LOGIN_PATH } from "../configs/apiPath";

const Login = function () {
  const navigate = useNavigate();
  const { setToken } = useContext(UserContext);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const onFinish = async (values) => {
    if (values.email && values.password) {
      const params = {
        email: values.email,
        password: values.password,
      };
      setIsBtnDisabled(true);
      await axiosDefault()
        .post(`${LOGIN_PATH}`, params)
        .then((response) => {
          if (response.data) {
            setToken(response.data.tokens.access.token);
            AuthHandler.setToken(response.data.tokens.access.token);
            message.success({ content: "Login Success", duration: 1 });
            setTimeout(() => {
              navigate("/product");
            }, 500);
          }
        })
        .catch((err) => {
          message.error({ content: "Login Fail", duration: 1 });
        });
    } else message.error({ content: "Login Fail", duration: 1 });
    setIsBtnDisabled(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-box">
      <h1>E-Commerce App</h1>
      <Form
        name="basic"
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <TextField placeholder="Email" prefixIcon={<MailOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <TextField
            placeholder="Password"
            prefixIcon={<LockOutlined />}
            isPassword={true}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isBtnDisabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
