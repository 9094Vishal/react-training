import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Image, Spin } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";
import { ToastContext } from "../context/ToastContext";
import api from "../api/Axios";
import { AuthContext } from "../context/loginContext";
import UploadImage from "./UploadImage";
import Item from "antd/es/list/Item";

const MenuAndTime = ({ setIsMenuDrawerOpen, id }) => {
  const [imagePreviews, setImagePreviews] = useState(null);
  const { makeToast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValue] = useState({
    image: "",
    foodCategory: "",
    title: "",
    isActive: true,
    price: "",
    description: "",
  });

  useEffect(() => {
    const regiData = getRegistratonData();

    if (regiData.menuItem) {
      setInitialValue({ menuItem: [...regiData.menuItem] });
    }

    return () => {};
  }, []);
  const category = {
    gujarati: "1",
    panjabi: "2",
    chiniess: "3",
  };

  const formSchema = Yup.object().shape({
    image: Yup.mixed().required("Food image is required"),
    foodCategory: Yup.string().required("This field is required"),
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    price: Yup.string().required("This field is required"),
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-3">Restaurant Menu </h1>
      <div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log("values: ", values);
            setIsLoading(true);
            const formData = new FormData();

            Object.keys(values).forEach((item) => {
              if (item != "image") {
                formData.append(item, values[item]);
              }
            });
            // Append the selected image (ensure the image is in File/Blob format)
            if (imagePreviews) {
              formData.append("food", values.image);
            }

            const response = await api.post(`/restaurant/food/${id}`, formData);
            if (response.status === 201) {
              makeToast("success", "Menu item added!");
              setIsMenuDrawerOpen(false);
            } else {
              makeToast("error", response.error);
            }
            setIsLoading(false);
          }}
          validationSchema={formSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="bg-white ">
                <UploadImage
                  selectedImage={imagePreviews}
                  setSelectedImage={setImagePreviews}
                  title="Food image"
                  props={{ name: "image" }}
                  onChangeImage={(name, file) => setFieldValue(name, file)}
                />
                <ErrorMessage
                  component="p"
                  name="image"
                  className="!text-red-500 !text-center !block"
                />

                <Flex justify="space-between">
                  <div
                    role="group"
                    aria-labelledby="checkbox-group"
                    className="flex items-center gap-2"
                  >
                    <label>
                      <Field
                        type="radio"
                        name={`foodCategory`}
                        value={category.panjabi}
                      />{" "}
                      Panjabi
                    </label>
                    <label className="">
                      <Field
                        type="radio"
                        name={`foodCategory`}
                        value={category.gujarati}
                      />{" "}
                      Gujarati
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name={`foodCategory`}
                        value={category.chiniess}
                      />{" "}
                      Chiniess
                    </label>
                  </div>

                  <label role="group" aria-labelledby="checkbox-group">
                    <Field type="checkbox" name={`isActive`} /> Available
                  </label>
                </Flex>
                <ErrorMessage
                  component="p"
                  name={`foodCategory`}
                  className="!text-red-500"
                />
                <div className="flex my-3 gap-3">
                  <div className="flex-1">
                    <Field
                      placeholder="Item name"
                      name={`title`}
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="text"
                    />
                    <ErrorMessage
                      component="span"
                      name={`title`}
                      className="!text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      placeholder="Price"
                      name={`price`}
                      className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                      type="number"
                    />
                    <ErrorMessage
                      component="span"
                      name={`price`}
                      className="!text-red-500"
                    />
                  </div>
                </div>
                <div className="flex-1 mt-3">
                  <Field
                    placeholder="Description"
                    name={`description`}
                    className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                    as="textarea"
                  />
                  <ErrorMessage
                    component="span"
                    name={`description`}
                    className="!text-red-500"
                  />
                </div>
              </div>

              <div className="text-end pr-4">
                <button
                  className="bg-btnColor text-white rounded-md py-2 w-36 hover:opacity-60 mt-2"
                  type="submit"
                  // disabled={isLoading}
                >
                  Add {isLoading && <Spin className="ml-2" />}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MenuAndTime;
