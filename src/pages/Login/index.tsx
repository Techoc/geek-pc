import { Button, Card, Checkbox, Form, Input, message } from "antd";
import logo from "@/assets/logo.png";
import "./index.scss";
import React from "react";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginStore } = useStore();
  let navigate = useNavigate();
  let onFinish = async (values: any) => {
    //values 是表单项里用户输入的数据
    console.log("Success:", values);
    //登录
    try {
      await loginStore.login({
        mobile: values.username,
        code: values.password,
      });
      //跳转首页
      navigate("/", { replace: true });
      //提示用户
      message.success("登录成功，即将跳转首页");
    } catch (e: any) {
      message.error(e.response?.data?.message || "登录失败");
    }
  };

  let onFinishFailed = async (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
              {
                min: 6,
                message: "密码至少是6位",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>

          <Form.Item>
            {/*渲染Button组件为submit按钮*/}
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
