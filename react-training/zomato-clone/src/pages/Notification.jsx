import React, { useContext } from "react";
import Nodata from "../components/Nodata";
import { AuthContext } from "../context/loginContext";

const Notification = () => {
  const { user } = useContext(AuthContext);
  if (!user.notification) {
    return (
      <div className="mx-20 my-3">
        <Nodata title="Notification" />
      </div>
    );
  }
  return (
    <div>
      <h1>Review</h1>
    </div>
  );
};

export default Notification;
