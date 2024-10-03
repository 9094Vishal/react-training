import React from "react";
import PageNoteFound from "../assets/404.png";
const NoPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <img className="self-center " src={`${PageNoteFound}`} />
    </div>
  );
};

export default NoPage;
