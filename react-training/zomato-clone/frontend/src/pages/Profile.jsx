import { Flex, Image } from "antd";
import React, { useState } from "react";

import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileHeader from "../components/ProfileHeader";
import ProfileBottonTab from "../components/ProfileBottonTab";
const Profile = () => {
  return (
    <div className="mx-20 my-3">
      <ProfileHeader />
      <ProfileBottonTab />
    </div>
  );
};

export default Profile;
