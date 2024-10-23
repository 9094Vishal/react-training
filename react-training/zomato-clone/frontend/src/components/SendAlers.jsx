import { Alert } from "antd";
import React from "react";

const SendAlers = ({ message, type }) => {
  // success, info, warning, error
  return <Alert message="Success Tips" type="success" showIcon closable />;
};

export default SendAlers;
