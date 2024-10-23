import React, { useContext, useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../context/loginContext";
import { EditUserProfile, getLoginUser } from "../helper/helper";

const EditProfile = ({ handleCancel }) => {
  const { user, setLoginData } = useContext(AuthContext);

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    EditUserProfile(user.phone, values);
    handleCancel();
    setLoginData(getLoginUser());
  };
  useEffect(() => {
    if (user.profileData) {
      const data = user.profileData;

      form.setFieldsValue({
        ...data,
      });
    }
    return () => {};
  }, []);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        maxWidth: 600,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="image"
        label="Image Url"
        rules={[
          {
            required: true,
            message: "Please input your Image!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" initialValue={user.phone}>
        <Input disabled />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[
          {
            required: true,
            message: "Please input your City!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button
          className="bg-btnColor hover:!bg-btnColor hover:!border-none hover:!text-white text-white"
          htmlType="submit"
        >
          Edit Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProfile;
