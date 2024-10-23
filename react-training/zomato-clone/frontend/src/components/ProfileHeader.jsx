import { Drawer, Flex, Image, Modal } from "antd";
import React, { useContext, useState } from "react";
import userImg from "../assets/user.png";
import banner from "../assets/banner.jpg";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "./EditProfile";
import { AuthContext } from "../context/loginContext";
const ProfileHeader = ({ isShow = true }) => {
  const { user } = useContext(AuthContext);
  const [isProfileModel, setIsProfileModel] = useState(false);

  const showModal = () => {
    setIsProfileModel(true);
  };

  const handleOk = () => {
    setIsProfileModel(false);
  };

  const handleCancel = () => {
    setIsProfileModel(false);
  };
  return (
    <Flex
      justify="space-between"
      style={{
        height: "20rem",
        position: "relative",
        marginBottom: "1rem",
        background: `linear-gradient(rgba(0, 0, 0, 0.13) 22.25%, rgba(0, 0, 0, 0.5) 55.5%) center center / cover no-repeat, url(${banner})`,
        backgroundPosition: "center center",
        color: "white",
      }}
    >
      <Flex gap={5} align="center" className="mx-4">
        <div className="h-20 w-20 border-4 border-white rounded-full">
          <Image
            src={user.image ? user.image : userImg}
            className="h-full w-full !rounded-full"
          />
        </div>
        <div className="uppercase">{user.name ? user.name : "User"}</div>
      </Flex>

      <Flex justify="center" align="center" vertical className="mr-4">
        <button
          className="bg-btnColor w-40  py-2 px-2 rounded-md flex items-center justify-center gap-2 text-white hover:gap-3 hover:transition-all hover:ease-in-out hover:duration-100"
          onClick={showModal}
        >
          <FontAwesomeIcon icon={faPenToSquare} className=" h-3 w-3" />
          Edit profile
        </button>
        <Flex className="mt-3">
          <div className="text-center">
            <span>0</span>
            <p>Reviews</p>
          </div>
        </Flex>
      </Flex>

      <Drawer
        title="Update Profile"
        width={520}
        closable={true}
        onClose={handleCancel}
        open={isProfileModel}
      >
        <EditProfile handleCancel={handleCancel} />
      </Drawer>
    </Flex>
  );
};

export default ProfileHeader;
