import React from "react";
import zomato from "../assets/zomato.png";
import apple from "../assets/apple.webp";
import android from "../assets/indroid.webp";
import {
  faFacebook,
  faLinkedin,
  faSquareInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const aboutZomato = [
  "Who We Are",
  "Blog",
  "Work With Us",
  "Investor Relations",
  "Report Fraud",
  "Press Kit",
  "Contact Us",
];
const zomavesrse = [
  "Zomato",
  "Blinkit",
  "Feeding India",
  "Hyperpure",
  "Zomato Live",
  "Zomaland",
  "Weather Union",
];
const learnMore = ["Privacy", "Security", "Terms", "Sitemap"];
const forRestaurants = ["Partner With Us", "Apps For You"];
const Footer = () => {
  const aboutData = aboutZomato.map((item) => (
    <li key={item} className="cursor-pointer hover:opacity-55">
      {item}
    </li>
  ));
  const zomavesrseData = zomavesrse.map((item) => (
    <li key={item} className="cursor-pointer hover:opacity-55">
      {item}
    </li>
  ));
  const forRestaurantsData = forRestaurants.map((item) => (
    <li key={item} className="cursor-pointer  hover:opacity-55">
      {item}
    </li>
  ));
  const learnMoreData = learnMore.map((item) => (
    <li key={item} className="cursor-pointer hover:opacity-55">
      {item}
    </li>
  ));

  return (
    <div className="px-20 my-5 bg-white">
      <div>
        <img src={zomato} />
      </div>
      <div className="flex justify-between items-start mt-3 flex-wrap">
        <ul>
          <li className="font-medium text-xl">About Zomato</li>
          {aboutData}
        </ul>
        <ul>
          <li className="font-medium text-xl">Zomaverse</li>
          {zomavesrseData}
        </ul>
        <ul>
          <li className="font-medium text-xl">For Restaurants</li>
          {forRestaurantsData}
        </ul>
        <ul>
          <li className="font-medium text-xl">Learn More</li>
          {learnMoreData}
        </ul>
        <ul className="flex flex-col gap-2">
          <li className="font-medium text-xl">Social links</li>
          <li className="flex gap-2">
            <FontAwesomeIcon className="cursor-pointer" icon={faFacebook} />
            <FontAwesomeIcon
              className="cursor-pointer "
              icon={faSquareInstagram}
            />
            <FontAwesomeIcon className="cursor-pointer" icon={faTelegram} />
            <FontAwesomeIcon className="cursor-pointer" icon={faLinkedin} />
          </li>
          <li>
            <a href="#">
              <img src={android} className="cursor-pointer w-40" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={apple} className="cursor-pointer w-40" />
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-2  border-black" />
      <p>
        By continuing past this page, you agree to our Terms of Service, Cookie
        Policy, Privacy Policy and Content Policies. All trademarks are
        properties of their respective owners. 2008-2024 © Zomato™ Ltd. All
        rights reserved.
      </p>
    </div>
  );
};

export default Footer;
