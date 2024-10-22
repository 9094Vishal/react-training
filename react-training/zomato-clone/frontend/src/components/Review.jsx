import React, { useContext } from "react";
import { AuthContext } from "../context/loginContext";
import Nodata from "./Nodata";

const Review = () => {
  const { user } = useContext(AuthContext);
  if (!user.review) {
    return <Nodata title="Review" />;
  }
  return (
    <div>
      <h1>Review</h1>
    </div>
  );
};

export default Review;
