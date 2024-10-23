import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { Button, Form, Input } from "antd";
import { AuthContext } from "../context/loginContext";
import { EditUserProfile, getLoginUser, updateUser } from "../helper/helper";
import UploadImage from "./UploadImage";
import api from "../api/Axios";
import { ToastContext } from "../context/ToastContext";

const EditProfile = ({ handleCancel }) => {
  const { user, setLoginData } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const { makeToast } = useContext(ToastContext);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (selectedImage) {
      console.log("file", selectedImage);
      try {
        const fileData = new FormData();
        fileData.append("profile", selectedImage);
        const response = await api.put(`/user/profile/${user._id}`, fileData);
        values.image = response.data.image;
      } catch (error) {
        makeToast("error", "Image upload fail!");
      }
    }
    const response = await api.put(`/user/${user._id}`, values);
    if (response.status === 200) {
      const { data } = response;
      updateUser(data.data);
      handleCancel();
      setLoginData(getLoginUser());
      makeToast("success", "Profile Updated.");
    } else {
      makeToast("error", "Something went wrong!");
    }
  };
  useEffect(() => {
    if (user.name) {
      const data = user;

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
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        image={user?.image || null}
      />

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
