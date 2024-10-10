import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { AddUserAddress } from "../helper/helper";
import { v4 as uuidv4 } from "uuid";
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
const AddAddres = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    AddUserAddress({ ...values, id: uuidv4() });
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
