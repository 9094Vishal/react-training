import { faPlus, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "antd";
import React, { useState } from "react";

const UploadImage = ({
  selectedImage,
  setSelectedImage,
  image = null,
  title = "Upload a Photo",
  props,
  onChangeImage = null,
}) => {
  return (
    <div className="flex gap-5 mb-5 items-center justify-center">
      {!selectedImage && image == null && (
        <label
          htmlFor="doc"
          className="flex items-center flex-col p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer w-52 h-28 justify-center"
        >
          <FontAwesomeIcon icon={faPlus} />

          <div className="space-y-2 text-center">
            <h4 className="text-base font-semibold text-gray-700">{title}</h4>
          </div>
          <input
            type="file"
            id="doc"
            name={props.name ? props.name : "myImage"}
            accept="png, jpg"
            className="!hidden"
            hidden
            onChange={(event) => {
              console.log(event.target.files[0]); // Log the selected file
              setSelectedImage(event.target.files[0]); // Update the state with the selected file
              if (onChangeImage) {
                onChangeImage("restaurantImage", event.target.files[0]);
              }
            }}
          />
        </label>
      )}

      {(selectedImage || image) && (
        <div>
          <Image
            alt="not found"
            className=" !h-52 object-cover rounded-xl"
            src={image != null ? image : URL.createObjectURL(selectedImage)}
          />
        </div>
      )}
      {(selectedImage || image) && (
        <div
          onClick={() => {
            setSelectedImage(null);
          }}
          className="flex items-center flex-col p-4 gap-3 rounded-3xl border border-red-400 border-dashed bg-gray-50 cursor-pointer  justify-center"
        >
          <FontAwesomeIcon icon={faTrash} style={{ color: "red " }} />
        </div>
      )}
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default UploadImage;
