import React from "react";
import Review from "./Review";
import Address from "./Address";

const ProfileBottomMainSide = ({ tab }) => {
  console.log("tab: ", tab);
  let component;
  switch (tab) {
    case "review":
      component = <Review />;
      break;
    case "address":
      component = <Address />;
      break;
    default:
      break;
  }
  return <div className="flex-1">{component}</div>;
};

export default ProfileBottomMainSide;
