import { Button, Checkbox, Form, Input, Select } from "antd";
import React, { useContext, useEffect } from "react";
import api from "../api/Axios";
import { AuthContext } from "../context/loginContext";
import { ToastContext } from "../context/ToastContext";
import { getLoginUser, getUserAddressById, updateUser } from "../helper/helper";
const { Option } = Select;

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
const AddAddres = ({
  isEdit = false,
  addressId = null,
  onChildrenDrawerClose,
}) => {
  const [form] = Form.useForm();
  const { user, setLoginData } = useContext(AuthContext);

  const { makeToast } = useContext(ToastContext);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const response = await api.put(`/user/address/${user._id}`, {
      address: isEdit && addressId ? { ...values, id: addressId } : values,
    });
    if (response?.status === 200) {
      const { data } = response.data;
      console.log("data: ", data);
      makeToast("success", "Address added successful!");
      updateUser(data);
      onChildrenDrawerClose();
      setLoginData(getLoginUser());
    } else {
      makeToast("error", "Something went Wrong!");
    }
  };

  useEffect(() => {
    if (isEdit && addressId) {
      const data = getUserAddressById(addressId);
      console.log("data: ", data);
      form.setFieldsValue({
        ...data,
      });
    }
    return () => {};
  }, []);
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
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            min: 10,
            message: "Phone number must be 10 digits",
          },
          {
            max: 10,
            message: "Phone number must be 10 digits",
          },
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="addressType"
        label="Address Type"
        rules={[
          {
            required: true,
            message: "Please select Address Type!",
          },
        ]}
      >
        <Select placeholder="select your Address type">
          <Option value="Home">Home</Option>
          <Option value="Office">Office</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[
          {
            required: true,
            message: "Please input delivery Address",
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
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
      <Form.Item
        name="state"
        label="State"
        rules={[
          {
            required: true,
            message: "Please input your State!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pin"
        label="Pin Code"
        rules={[
          {
            required: true,
            message: "Please input your Pin code!",
          },
          {
            max: 6,
            message: "Pin must be 6 digits",
          },
          {
            min: 6,
            message: "Pin must be 6 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="default" valuePropName="checked" {...tailFormItemLayout}>
        <Checkbox className="">Default Adress</Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button className="bg-btnColor text-white" htmlType="submit">
          Add Address
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddAddres;
