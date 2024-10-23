import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const UploadImage = ({ selectedImage, setSelectedImage, image = null }) => {
  return (
    <div className="flex gap-5 mb-5 items-center justify-center">
      <label
        htmlFor="doc"
        className="flex items-center flex-col p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer w-52 h-28 justify-center"
      >
        <FontAwesomeIcon icon={faPlus} />
        <div className="space-y-2 text-center">
          <h4 className="text-base font-semibold text-gray-700">
            Upload a Photo
          </h4>
        </div>
        <input
          type="file"
          id="doc"
          name="myImage"
          accept="png, jpg"
          className="!hidden"
          hidden
          onChange={(event) => {
            console.log(event.target.files[0]); // Log the selected file
            setSelectedImage(event.target.files[0]); // Update the state with the selected file
          }}
        />
      </label>
      {(selectedImage || image) && (
        <div>
          <img
            alt="not found"
            className="w-28 object-cover rounded-full"
            src={image != null ? image : URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default UploadImage;
