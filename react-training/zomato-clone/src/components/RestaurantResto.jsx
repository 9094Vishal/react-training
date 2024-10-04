import React, { useContext, useEffect, useState } from "react";
import partnerImg from "../assets/RestaurantResto.png";
import zomatoPartnerLogo from "../assets/zomato-partner.png";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "../components/Login";
import OtpPopup from "../components/Otp";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/loginContext";
import Profile from "./Profile";
const RestaurantResto = () => {
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
      className=" relative  h-[850px] md:h-[750px] md:bg-homepage-banner md:bg-cover md:bg-center"
      style={{
        backgroundImage: `url(${partnerImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="text-black bg-white flex items-center justify-between sticky top-0 w-full border-b py-3 px-10">
        <img src={zomatoPartnerLogo} className="w-[150px] invert" />
        <div className=" flex items-center gap-3">
          <p className=" hover:opacity-65">Need help? Contact +91 873491561</p>
          <Profile />
        </div>
      </div>
      <div className="px-60">
        <div className=" px-20 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-semibold">
              Partner with Zomato <br />
              and grow your business
            </h1>
            <p className="my-5">
              0% commission for the 1st month for new restaurant partners in
              selected cities
            </p>
            <button
              className="bg-blue-500 py-2 text-[17px] rounded-md w-[350px] text-white"
              onClick={() => {
                isLogin ? navigate("/partner-with-us/new") : handleClick;
              }}
            >
              Register your restaurant
            </button>
          </div>
          <div className="bg-white rounded-md py-6 px-3 text-black text-center mt-12">
            <p className="text-4xl">Get Started - It only takes 10 minutes</p>
            <p className="text-lg mt-3">
              Please keep the documents ready for a smooth signup
            </p>
            <ul className="px-5 grid grid-cols-2 text-start gap-3 mt-3">
              {card}
            </ul>
          </div>
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

export default RestaurantResto;
