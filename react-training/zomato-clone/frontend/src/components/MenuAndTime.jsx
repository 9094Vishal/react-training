import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Image } from "antd";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { AddRestaurantContext } from "../context/AddRestaurantContext";
import { getRegistratonData } from "../helper/helper";
import { ToastContext } from "../context/ToastContext";
import api from "../api/Axios";
import { AuthContext } from "../context/loginContext";

const MenuAndTime = () => {
  const [imagePreviews, setImagePreviews] = useState({});
  const { makeToast } = useContext(ToastContext);
  const { user } = useContext(AuthContext);
  const [initialValues, setInitialValue] = useState({
    menuItem: [
      {
        image: "",
        foodCategory: "",
        title: "",
        isActive: true,
        id: uuidv4(),
        price: "",
        description: "",
      },
    ],
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

  const { setActiveId } = useContext(AddRestaurantContext);
  const formSchema = Yup.object().shape({
    menuItem: Yup.array().of(
      Yup.object().shape({
        image: Yup.mixed().required("Food image is required"),
        foodCategory: Yup.string().required("This field is required"),
        title: Yup.string().required("This field is required"),
        description: Yup.string().required("This field is required"),
        price: Yup.string().required("This field is required"),
      })
    ),
  });
  const handleImageUpload = (event, index, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue(`menuItem.${index}.image`, file);
      setImagePreviews((prevState) => ({
        ...prevState,
        [index]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl mb-3">Restaurant Menu </h1>
      <div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("values: ", values);

            let regiData = getRegistratonData();
            let data = { ...values };
            localStorage.setItem("complatedTap", 2);
            if (regiData?.menuItem) {
              regiData = {
                ...regiData,
                menuItem: [...data.menuItem],
              };
            } else regiData = { ...regiData, ...data };
            regiData.menuItem = regiData.menuItem.map((item) => {
              item.image = JSON.stringify(item.image);
              console.log("item.image: ", item.image);
              return item;
            });
            console.log("regiData: ", regiData);
            // localStorage.setItem("registrationData", JSON.stringify(regiData));
            // setActiveId(3);
          }}
          validationSchema={formSchema}
        >
          {({ values, setFieldValue, validateForm }) => (
            <Form>
              <FieldArray name="menuItem">
                {({ insert, remove, push }) => (
                  <>
                    {values.menuItem.length > 0 &&
                      values.menuItem.map((item, index) => {
                        return (
                          <div
                            className="bg-white p-3 rounded-xl shadow my-3"
                            key={index}
                          >
                            {" "}
                            <div className="flex gap-5 items-center">
                              <label
                                htmlFor={`menuItem.${index}.image`}
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
                                  id={`menuItem.${index}.image`}
                                  name={`menuItem.${index}.image`}
                                  accept="image/*"
                                  // className="!hidden"
                                  hidden
                                  onChange={(event) => {
                                    console.log(values);
                                    handleImageUpload(
                                      event,
                                      index,
                                      setFieldValue
                                    );
                                    // values.menuItem[index].images =
                                    //   event.target.files[0];
                                    // console.log(event.target.files[0]); // Log the selected file
                                    // setSelectedImage(event.target.files[0]); // Update the state with the selected file
                                  }}
                                />
                              </label>
                              {imagePreviews[index] && (
                                <div>
                                  <Image
                                    alt="not found"
                                    className="!w-28 object-cover rounded-full"
                                    src={imagePreviews[index]}
                                  />
                                </div>
                              )}
                            </div>
                            <ErrorMessage
                              component="p"
                              name={`menuItem.${index}.image`}
                              className="!text-red-500"
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
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.panjabi}
                                  />{" "}
                                  Panjabi
                                </label>
                                <label className="">
                                  <Field
                                    type="radio"
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.gujarati}
                                  />{" "}
                                  Gujarati
                                </label>
                                <label>
                                  <Field
                                    type="radio"
                                    name={`menuItem.${index}.foodCategory`}
                                    value={category.chiniess}
                                  />{" "}
                                  Chiniess
                                </label>
                              </div>

                              <label
                                role="group"
                                aria-labelledby="checkbox-group"
                              >
                                <Field
                                  type="checkbox"
                                  name={`menuItem.${index}.isActive`}
                                />{" "}
                                Available
                              </label>
                            </Flex>
                            <ErrorMessage
                              component="p"
                              name={`menuItem.${index}.foodCategory`}
                              className="!text-red-500"
                            />
                            <div className="flex my-3 gap-3">
                              <div className="flex-1">
                                <Field
                                  placeholder="Item name"
                                  name={`menuItem.${index}.title`}
                                  className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                  type="text"
                                />
                                <ErrorMessage
                                  component="span"
                                  name={`menuItem.${index}.title`}
                                  className="!text-red-500"
                                />
                              </div>
                              <div className="flex-1">
                                <Field
                                  placeholder="Price"
                                  name={`menuItem.${index}.price`}
                                  className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                  type="number"
                                />
                                <ErrorMessage
                                  component="span"
                                  name={`menuItem.${index}.price`}
                                  className="!text-red-500"
                                />
                              </div>
                            </div>
                            <div className="flex-1 mt-3">
                              <Field
                                placeholder="Description"
                                name={`menuItem.${index}.description`}
                                className="w-full block border border-gray-300 outline-gray-300 py-2 px-3 rounded-lg"
                                as="textarea"
                              />
                              <ErrorMessage
                                component="span"
                                name={`menuItem.${index}.description`}
                                className="!text-red-500"
                              />
                            </div>
                            <button
                              type="button"
                              className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                              onClick={async () => {
                                let isError = false;
                                console.log(
                                  "values.menuItem[index]: ",
                                  values.menuItem[index]
                                );
                                Object.keys(values.menuItem[index]).forEach(
                                  (item) => {
                                    if (
                                      values.menuItem[index][item] == "" ||
                                      values.menuItem[index][item] == null
                                    ) {
                                      if (
                                        values.menuItem[index][item] ==
                                        "isActive"
                                      ) {
                                      } else isError = true;
                                    }
                                  }
                                );

                                if (!isError) {
                                  console.log("image", imagePreviews);
                                  // const response = await api.delete(
                                  //   `/restaurant/${user._id}/${values.menuItem[index].id}`
                                  // );
                                  // if (response.status === 200) {
                                  //   makeToast("success", "Menu item deleted!");
                                  //   remove(index);
                                  // }
                                }
                                // else remove(index);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    <button
                      type="button"
                      className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                      onClick={async () => {
                        const errors = await validateForm();

                        if (values.menuItem == 0) {
                          push({
                            image: "",
                            foodCategory: "",
                            title: "",
                            id: uuidv4(),
                            isActive: ``,
                            price: "",
                            description: "",
                          });
                        } else if (Object.keys(errors).length === 0) {
                          const data =
                            values.menuItem[values.menuItem.length - 1];
                          const file = new FormData();
                          console.log("data.menuItem: ", data);
                          file.append("food", data.image);
                          file.append("data", JSON.stringify(data));

                          const response = await api.put(
                            `/restaurant/${user._id}`,
                            file
                          );
                          if (response) {
                            makeToast("success", "Food item added.");
                            console.log("response: ", response);
                          }

                          push({
                            image: "",
                            foodCategory: "",
                            title: "",
                            isActive: ``,
                            price: "",
                            description: "",
                          });
                        } else {
                          console.log(errors); // Log or handle errors
                          makeToast("error", "Please feel food item!");
                        }
                      }}
                    >
                      Add to menu
                    </button>
                  </>
                )}
              </FieldArray>

              <div className="text-end pr-4">
                <button
                  className="bg-[#D5D5D5] rounded-md py-2 w-36 hover:opacity-60 mt-2"
                  type="submit"
                >
                  submit
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
