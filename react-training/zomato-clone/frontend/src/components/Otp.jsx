import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spin } from "antd";
import OTPInput, { ResendOTP } from "otp-input-react";
import React, { useContext, useMemo, useState } from "react";
import "react-phone-input-2/lib/style.css";
import api from "../api/Axios";
import { AuthContext } from "../context/loginContext";
import { ToastContext } from "../context/ToastContext";
import { getLoginUser, login } from "../helper/helper";

const OtpPopup = ({ setOtpModel, phone }) => {
  const { setLoginData } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);
  const { makeToast } = useContext(ToastContext);

  const [otpError, setOtpError] = useState(null);
  const [OTP, setOTP] = useState("");

  //   this will handel login and signup with otp
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    // if (!otpError) {
    setIsloading(true);
    // const response = await api.post(`twilio/verify-otp`, { phone, otp: OTP });
    // if (response.status == 200) {
    try {
      const login1 = await api.post("/auth/signin", {
        phone,
      });
      if (login1.status == 200) {
        const { data, token } = login1.data;
        console.log("user: ", data);
        login(token, data); // needed
        setLoginData(getLoginUser()); //needed
        setOtpModel(false);
      }
    } catch (error) {
      if (error.status == 401) {
        setOtpError("Wrong Otp");
        return;
      }
    }
    setIsloading(false);
    // } else {
    //   setOtpError("Please enter valid OTP!");
    //   return;
    // }
    // }
  };
  //   validation otp fields
  const validate = () => {
    if (OTP == "") {
      setOtpError("This field is required");
    } else {
      setOtpError(null);
    }
  };
  //   change event for otp
  const handleChange = (e) => {
    validate();
    setOTP(e);
  };
  return (
    <div className="w-full h-screen fixed top-0 left-0 z-10 bg-[rgb(0,0,0,0.6)] flex items-center justify-center">
      <div className="p-5 max-w-96 w-full bg-white text-black rounded-lg">
        <div className="flex items-center justify-between   ">
          <span className="text-gray-500 text-2xl">OTP Verification</span>
          <span className="cursor-pointer" onClick={() => setOtpModel(false)}>
            <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
          </span>
        </div>
        <hr className="my-2" />
        <div className="mt-2">
          <form onSubmit={handleSubmit} className="text-center">
            Check text messages for your OTP
            <div className="mt-3">
              <OTPInput
                value={OTP}
                onChange={handleChange}
                autoFocus
                OTPLength={6}
                otpType="number"
                isInputNum={true}
                shouldAutoFocus={true}
                disabled={false}
                inputStyles={{
                  border: `1px solid ${otpError ? "red" : "black"}`,
                  height: "40px",
                  width: "40px",
                }}
              />
              {otpError && (
                <div className="text-start text-btnColor">{otpError}</div>
              )}
              <ResendOTP
                onResendClick={async () => {
                  setIsloading(true);
                  setOTP("");
                  const response = await api.post(`/twilio/send-otp`, {
                    phone,
                  });
                  if (response.status == 200) {
                    makeToast("success", "OTP sent to your phone number");
                    setIsloading(false);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className={`w-full mt-3 bg-btnColor text-white py-2 ${
                otpError && "cursor-not-allowed"
              } rounded-md`}
            >
              Submit {isLoading && <Spin />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
