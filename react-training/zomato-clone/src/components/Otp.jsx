import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import {
  createUser,
  getLoginUser,
  getUserByNumber,
  login,
  sendOtp,
  setLoginUser,
} from "../helper/helper";
import { AuthContext } from "../context/loginContext";

const OtpPopup = ({ setOtpModel, otp, phone }) => {
  console.log("otp: ", otp);
  let userOtp = useMemo(() => otp, [otp]);
  const { setLoginData } = useContext(AuthContext);

  const [otpError, setOtpError] = useState(null);
  const [OTP, setOTP] = useState("");

  //   this will handel login and signup with otp
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otpError) {
      if (OTP != userOtp) {
        setOtpError("Wrong Otp");
        return;
      }
      const user = getUserByNumber(phone);
      if (!user) {
        createUser({ phone: phone });
      }
      login();
      setLoginData(getLoginUser());
      setLoginUser(phone);
      setOtpModel(false);
    }
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
              <ResendOTP onResendClick={() => (userOtp = sendOtp())} />
            </div>
            <button
              type="submit"
              className={`w-full mt-3 bg-btnColor text-white py-2 ${
                otpError && "cursor-not-allowed"
              } rounded-md`}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
