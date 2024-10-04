import React, { useContext, useEffect, useState } from "react";
import partnerImg from "../assets/partner.webp";
import zomatoPartnerLogo from "../assets/zomato-partner.png";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "../components/Login";
import OtpPopup from "../components/Otp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/loginContext";
const PartnerWithUs = () => {
  const [loginModel, setLoginModel] = useState(false);
  const [otpModel, setOtpModel] = useState(false);
  const [phone, setPhone] = useState(null);
  const { isLogin } = useContext(AuthContext);

  const [userOtp, setUserOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // if (isLogin) {
    //   navigate("/partner-with-us/new");
    // }
    return () => {};
  }, []);
  const cardData = [
    "FSSAI license copy",
    "PAN card copy",
    "Regular GSTIN",
    "Bank account details",
    "Your restaurant menu",
    "Dish images for top 5 items",
  ];
  const card = cardData.map((card, id) => (
    <li key={id}>
      <FontAwesomeIcon icon={faCircleCheck} className="text-green-500" />
      <span className="ml-2">{card}</span>
    </li>
  ));
  const handleClick = () => {
    setLoginModel(true);
  };
  return (
    <div
      className="bg-no-repeat h-screen px-60 py-2 w-full bg-[#F4F4F4]"
      style={{
        backgroundImage: `url(${partnerImg})`,
        backgroundSize: "100% 55%",
      }}
    >
      <div className="flex items-center justify-between ">
        <img src={zomatoPartnerLogo} className="w-[150px]" />
        {!isLogin && (
          <button
            className="border border-white text-white py-1 rounded-md px-5 hover:opacity-65"
            onClick={handleClick}
          >
            Login
          </button>
        )}
      </div>
      <div className="text-white px-20 py-10">
        <div>
          <h1 className="text-4xl">
            Partner with Zomato <br /> at 0% commission for the 1st month!
          </h1>
          <p className="my-5">
            And get ads worth INR 1500. Valid for new restaurant partners in
            select cities.
          </p>
          <span className="text-[17px] flex items-center flex-wrap gap-3">
            {" "}
            <button
              className="bg-blue-500 py-2 rounded-md flex-1"
              onClick={() => {
                isLogin ? navigate("/partner-with-us/new") : handleClick;
              }}
            >
              Register your restaurant
            </button>
            {!isLogin && (
              <button
                className="bg-white  text-black py-2 rounded-md flex-1"
                onClick={handleClick}
              >
                Login to view your exising restaurant
              </button>
            )}
          </span>
          <p className="mt-3">Need help? Contact +91 873491561</p>
        </div>
        <div className="bg-white rounded-md py-6 px-3 text-black text-center mt-12">
          <p className="text-4xl">Get started with online ordering</p>
          <p className="text-lg mt-3">
            Please keep the documents ready for a smooth signup
          </p>
          <ul className="px-5 grid grid-cols-2 text-start gap-3 mt-3">
            {card}
          </ul>
        </div>
      </div>
      {loginModel && (
        <Login
          otp={setUserOtp}
          setLoginModel={setLoginModel}
          setOtpModel={setOtpModel}
          phone={phone}
          setPhone={setPhone}
        />
      )}

      {otpModel && (
        <OtpPopup setOtpModel={setOtpModel} otp={userOtp} phone={phone} />
      )}
    </div>
  );
};

export default PartnerWithUs;
