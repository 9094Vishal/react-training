import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ViewRequestPage = () => {
  return (
    <div className="bg-white  my-10 mx-20">
      <h1 className="text-3xl">Orders Request</h1>
      <div className="bg-[#F0F1F3] rounded-lg p-3">
        <div className="flex gap-3">
          <p>Customer : Vishal</p>
          <p>Phone : 9016451303</p>
        </div>
        <div>
          <p className="text-xl font-medium">Order</p>
          {/* no of item from one order goes here  */}
          <div className="flex justify-between  items-center">
            <div>
              <p>Manchuriyan Dry X 2</p>
              <p>Pani chili</p>
            </div>
            <div>
              <button className="h-6 w-6 mr-3">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="h-full w-full"
                  style={{ color: "#29c775" }}
                />
              </button>
              <button className="h-6 w-6 mr-3">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="h-full w-full"
                  style={{ color: "#eb0000" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequestPage;
