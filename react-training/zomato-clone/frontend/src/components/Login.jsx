import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import startsWith from "lodash.startswith";
import { isValidPhoneNumber } from "libphonenumber-js";
import { sendOtp } from "../helper/helper";
import axios from "axios";
import api from "../api/Axios";
import { Spin } from "antd";
import toast from "react-hot-toast";
import { ToastContext } from "../context/ToastContext";
const Login = ({ setLoginModel, setOtpModel, otp, phone, setPhone }) => {
  const [phoneError, setPhoneError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const { makeToast } = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    otp(sendOtp());
    setIsloading(true);
    // const response = await api.post(`/twilio/send-otp`, { phone });
    // console.log("response: ", response);

    // if (response.status == 200) {
    makeToast("success", "OTP sent to your phone number");
    setLoginModel(false);
    setOtpModel(true);
    setIsloading(false);
    // } else if (response.status >= 400 && response.status <= 499) {
    //   setIsloading(false);
    //   makeToast("error", "Something went wrong!");
    // }
  };
  const isValid = (value, country) => {
    if (value == "") {
      return false;
    }
    if (isValidPhoneNumber("+" + value, country.iso2)) {
      return true;
    } else {
      return false;
    }
  };
  const handleChange = (value, country, e, formattedValue) => {
    if (value == "") {
      setPhoneError("This field is required");
    } else if (isValidPhoneNumber("+" + value, country.iso2)) {
      setPhoneError(null);
      setPhone(value);
    } else {
      setPhoneError("Enter valid phone number");
    }
  };
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[rgb(0,0,0,0.6)] flex items-center justify-center">
      <div className="p-5 max-w-96 w-full bg-white text-black rounded-lg">
        <div className="flex items-center justify-between   ">
          <span className="text-gray-500 text-2xl">Login/Signup</span>
          <span className="cursor-pointer" onClick={() => setLoginModel(false)}>
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </span>
        </div>
        <hr className="my-2" />
        <div className="mt-10">
          <form onSubmit={handleSubmit}>
            <div className="">
              <label>Phone Number</label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={handleChange}
                enableSearch={true}
                placeholder={"Phone"}
                inputStyle={{
                  width: "100%",
                }}
                required={true}
                isValid={isValid}
              />
              {phoneError != "" && (
                <span className="text-btnColor">{phoneError}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={phoneError}
              className={`w-full mt-10  bg-btnColor text-white py-2 ${
                phoneError && "cursor-not-allowed"
              } rounded-md`}
            >
              Get Otp {isLoading && <Spin />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
