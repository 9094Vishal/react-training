import { Flex } from "antd";
import React, { useState } from "react";
import ProfileBottomSideBar from "./ProfileBottomSideBar";
import ProfileBottomMainSide from "./ProfileBottomMainSide";

const ProfileBottonTab = () => {
  const [activeTab, setActiverTab] = useState("review");

  return (
    <Flex gap={20}>
      <ProfileBottomSideBar
        activerTab={activeTab}
        setActiverTab={setActiverTab}
      />
      <ProfileBottomMainSide tab={activeTab} />
    </Flex>
  );
};

export default ProfileBottonTab;
